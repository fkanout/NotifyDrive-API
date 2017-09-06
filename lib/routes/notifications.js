

const auth = require('../controller/auth');
const Car = require('../db/models/car');
const User = require('../db/models/user');
const Device = require('../db/models/device');
const NotificationsHistory = require('../db/models/notificationsHistory');
const AMQP = require('../helpers/amqp');

module.exports = (router) => {
  router.post(
    '/notifydriver',
    async (ctx, next) => {
      const user = await auth.authenticate(ctx.request.headers.authorization);
      ctx.assert(user, 401);

      const carId = ctx.request.body.carId;
      const ownerId = ctx.request.body.ownerId;
      const msgSelected = ctx.request.body.msgSelected;
      const car = await Car.findOne({ _id: carId });
      ctx.assert(car, 404, 'Car not found');

      const carOwner = await User.findOne({ _id: ownerId });
      ctx.assert(carOwner, 404, 'Car owner not found');

      const devices = await Device.find({ userId: carOwner._id });
      ctx.assert(devices, 404, 'Car owner has no devices');

      const devicesId = [];
      devices.forEach(async (device) => {
        if (device.token) {
          await AMQP.publish(JSON.stringify({
            token: device.token,
            title: 'Notify Driver',
            body: `Message concernant votre voiture dons la plaque d'immatriculation est ${car.plate}: ${msgSelected}`,
          }), process.env.QUEUE);
          devicesId.push(device._id);
        }
      });
      // const fullAddress = await getAddress.getAddress(ctx.request.body.lat, ctx.request.body.log);
      // TODO: link to microservice

      await NotificationsHistory.create({
        senderId: user.userId,
        receiverId: carOwner._id,
        sentMsg: msgSelected,
        carPlate: car.plate,
        receivedDevices: devicesId,
        geoLocation: {
          lat: ctx.request.body.lat,
          log: ctx.request.body.log,
          // fullAddress: JSON.parse(fullAddress),
          // formatedAddress: JSON.parse(fullAddress).results[0].formatted_address,
        },

      });
      ctx.body = { success: true };
      await next;
    },
  );

  router.get(
    '/sentnotifications',
    async (ctx, next) => {
      const user = await auth.authenticate(ctx.request.headers.authorization);
      ctx.assert(user, 401);

      const carId = ctx.request.body.carId;
      const ownerId = ctx.request.body.ownerId;

      const receivedNotifications = await NotificationsHistory.find({ senderId: user.userId });
      ctx.assert(receivedNotifications, 401);


      ctx.body = receivedNotifications;
      await next;
    },
  );

  router.get(
    '/receivednotifications',
    async (ctx, next) => {
      const user = await auth.authenticate(ctx.request.headers.authorization);
      ctx.assert(user, 401);

      const receivedNotifications = await NotificationsHistory.find({ receiverId: user.userId });
      ctx.assert(receivedNotifications, 401);


      ctx.body = receivedNotifications;
      await next;
    },
  );
};


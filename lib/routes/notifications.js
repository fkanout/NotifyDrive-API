const auth = require('../controller/auth');
const Car = require('../db/models/car');
const User = require('../db/models/user');
const Device = require('../db/models/device');
const NotificationsHistory = require('../db/models/notificationsHistory');
const AMQP = require('../helpers/amqp');
const httpRequest = require('request-promise-native');

module.exports = (router) => {
  router.post(
    '/notifydriver',
    auth.authenticate,
    async (ctx, next) => {
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

      // ****** GPS to Address Microservice 
      const httpReqOptions = {
        method: 'POST',
        uri: process.env.GPSTOADDRESS_URL || 'http://localhost:9999/geolocation',
        body: {
          task: process.env.GPSTOADDRESS_TASK || 'geolocation',
          gps: {
            lat: parseFloat(ctx.request.body.lat),
            log: parseFloat(ctx.request.body.log),
          },
        },
        json: true,
      };
      let { address } = await httpRequest(httpReqOptions);
      if (!address) { address = 'unlocated'; }
      // ************

      await NotificationsHistory.create({
        senderId: ctx.state.userId,
        receiverId: carOwner._id,
        sentMsg: msgSelected,
        carPlate: car.plate,
        receivedDevices: devicesId,
        geoLocation: {
          lat: ctx.request.body.lat,
          log: ctx.request.body.log,
          fullAddress: address,
          formatedAddress: address,
        },
      });
      ctx.body = { success: true };
      await next;
    },
  );

  router.get(
    '/sentnotifications',
    auth.authenticate,
    async (ctx, next) => {
      const receivedNotifications = await NotificationsHistory.find({ senderId: ctx.state.userId });
      ctx.assert(receivedNotifications, 204, 'No sent notifications');
      ctx.body = receivedNotifications;
      await next;
    },
  );

  router.get(
    '/receivednotifications',
    auth.authenticate,
    async (ctx, next) => {
      const receivedNotifications = await NotificationsHistory.find({
        receiverId: ctx.state.userId,
      });
      ctx.assert(receivedNotifications, 204, 'No received notifications');
      ctx.body = receivedNotifications;
      await next;
    },
  );
};


const auth = require('../controller/auth');
const Car = require('../db/models/car');

module.exports = (router) => {
  router.get(
    '/cars',
    auth.authenticate,
    async (ctx, next) => {
      const cars = await Car.find({ owner: ctx.state.userId });
      ctx.assert(cars, 409);
      ctx.body = cars;
      await next;
    },
  );
  router.get(
    '/cars/:plateNumber',
    auth.authenticate,
    async (ctx, next) => {
      const plate = await Car.findOne({ plate: ctx.params.plateNumber });
      ctx.assert(plate, 404, 'Car plate number not found');
      ctx.body = plate;
      await next;
    },
  );
  router.post(
    '/cars/:plateNumber',
    auth.authenticate,
    async (ctx, next) => {
      const car = await Car.findOne({ plate: ctx.request.body.plate });
      ctx.assert(!car, 409);
      const newCarToAdd = await Car.create({
        plate: ctx.request.body.plate,
        mark: ctx.request.body.mark,
        year: ctx.request.body.year,
        model: ctx.request.body.model,
        owner: user.userId,
        department: ctx.request.body.department,
      });
      ctx.assert(newCarToAdd, 500);
      ctx.body = newCarToAdd;
      await next;
    },
  );

  router.post(
    '/cars/oscaro/:plateNumber',
    auth.authenticate,
    async (ctx, next) => {
      const options = {
        method: 'POST',
        uri: ' https://www.oscaro.com/Catalog/SearchEngine/LicencePlateJQueryV2',
        body: {
          frenchLicencePlate: ctx.request.body.plate,
        },
        json: true, // Automatically stringifies the body to JSON
      };
      const requestedCar = await rpn(options);
      ctx.assert(requestedCar, 401);
      const group = requestedCar.types[0].Text.split(' ');
      ctx.body = {
        Mark: group[0],
        Model: group[1],
      };
      await next;
    },
  );

  // ******* This route to re-thinking 
  router.post(
    '/cars/evaluation/:plateNumber',
    auth.authenticate,
    async (ctx, next) => {
      const carId = ctx.request.body.carId;
      const ownerId = ctx.request.body.ownerId;
      let car;
      // todo Optimisation;
      if (ctx.request.body.evaluation === 'positive') {
        car = await Car.update(
          { _id: carId },
          { $addToSet: {
            'evaluation.positive': user.userId,
          },
          });
      } else {
        car = await Car.update(
          { _id: carId },
          { $addToSet: {
            'evaluation.negative': user.userId,
          },
          });
      }
      ctx.assert(car, 404, 'Car not found');
      ctx.body = car;
      await next;
    },
  );
  // *************
};


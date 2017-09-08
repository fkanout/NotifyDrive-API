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
      ctx.assert(!car, 409, 'Plate number is aleardy added');
      const newCarToAdd = await Car.create({
        plate: ctx.request.body.plate,
        mark: ctx.request.body.mark,
        year: ctx.request.body.year,
        model: ctx.request.body.model,
        owner: ctx.state.userId,
        department: ctx.request.body.department,
      });
      ctx.assert(newCarToAdd, 500);
      ctx.status = 201;
      ctx.body = newCarToAdd;
      await next;
    },
  );
};


const bcrypt = require('bcrypt');
const jwt = require('../helpers/jwt');
const User = require('../db/models/user');
const Device = require('../db/models/device');

module.exports = (router) => {
  router.post(
    '/signup',
    async (ctx, next) => {
      const user = await User.findOne({ email: ctx.request.body.email });
      ctx.assert(!user, 409, 'User already exists');

      const userCreated = await User.create({
        email: ctx.request.body.email,
        password: bcrypt.hashSync(ctx.request.body.password, bcrypt.genSaltSync(10)),
      });
      ctx.assert(userCreated, 500, 'User not created');
      const userDevice = await Device.create({
        userId: userCreated._id,
        token: ctx.request.body.deviceToken,
      });
      ctx.assert(userDevice, 500, 'Problem with your device');
      //* ******

      const token = jwt.sign({ userId: userCreated._id });
      ctx.body = { token };
      await next;
    });
};


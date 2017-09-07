const bcrypt = require('bcrypt');
const jwt = require('../helpers/jwt');
const User = require('../db/models/user');
const Device = require('../db/models/device');
const validator = require('../helpers/validator');
const Joi = require('joi');


module.exports = (router) => {
  router.post(
    '/signup',
    async (ctx, next) => {
      const { error } = await Joi.validate({
        email: ctx.request.body.email,
        password: ctx.request.body.password,
        deviceToken: ctx.request.body.deviceToken,
      }, validator.signupSchema);
      ctx.assert(!error, 400, error && error.ValidationError);

      const user = await User.findOne({ email: ctx.request.body.email });
      ctx.assert(!user, 409, 'User already exists');

      const userCreated = await User.create({
        email: ctx.request.body.email,
        password: bcrypt.hashSync(ctx.request.body.password, bcrypt.genSaltSync(10)),
      });
      ctx.assert(userCreated, 404, 'User not created');
      const userDevice = await Device.create({
        userId: userCreated._id,
        token: ctx.request.body.deviceToken,
      });
      ctx.assert(userDevice, 404, 'Failed to register mobile token');
      let token;
      try {
        token = jwt.sign({ userId: userCreated._id });
      } catch (err) {
        ctx.assert(token, 404, 'Token failed to sign');
      }
      ctx.status = 201;
      ctx.body = { token };
      await next;
    });
};


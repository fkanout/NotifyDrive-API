const bcrypt = require('bcrypt');
const jwt = require('../helpers/jwt');
const User = require('../db/models/user');
const Device = require('../db/models/device');

module.exports = (router) => {
  router.post('/signin',
    async (ctx, next) => {
      const user = await User.findOne({ email: ctx.request.body.email });
      ctx.assert(user, 401);
      const password = bcrypt.compareSync(ctx.request.body.password, user.password);
      ctx.assert(password, 401, 'Wrong password');
      const token = jwt.sign({ userId: user._id });
      ctx.assert(token, 500, 'Token problem');
      const deviceQuery = { deviceInfo: { uuid: ctx.request.body.device.uuid } };
      const device = await Device.findOneAndUpdate(deviceQuery, { token: ctx.request.body.deviceToken,
        deviceInfo: ctx.request.body.device,
        userId: user._id,
      }, { new: true, upsert: true });
      console.log(device);
      ctx.body = { token };
      await next();
    });

  router.get(
    '/checktoken',
    async (ctx, next) => {
      const authorization = ctx.request.headers.authorization;
      ctx.assert(authorization, 401, 'Not correct header');
      try {
        await jwt.verify(authorization);
        ctx.body = { success: true };
      } catch (err) {
        ctx.assert(null, 401, 'Not valid token');
      }
      await next;
    },
  );
};


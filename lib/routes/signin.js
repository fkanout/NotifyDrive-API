const bcrypt = require('bcrypt');
const jwt = require('../helpers/jwt');
const User = require('../db/models/user');
const Device = require('../db/models/device');
const auth = require('../controller/auth');

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
      await Device.findOneAndUpdate(deviceQuery,
        {
          token: ctx.request.body.deviceToken,
          deviceInfo: ctx.request.body.device,
          userId: user._id,
        }, {
          new: true,
          upsert: true,
        });
      ctx.body = { token };
      await next();
    });

  router.get(
    '/checktoken',
    auth.authenticate,
    async (ctx, next) => {
      ctx.body = { success: true };
      await next;
    },
  );
};


const Joi = require('joi');
const jwt = require('../helpers/jwt');
const User = require('../db/models/user');

const authSchema = Joi.object().keys({
  accessToken: [Joi.string(), Joi.number()],
});

module.exports.authenticate = async (ctx, next) => {
  const token = ctx.headers.authorization;
  ctx.assert(token, 401, 'Authorization header not provided');
  const joiValidation = await Joi.validate({ accessToken: token }, authSchema);
  ctx.assert(joiValidation, 401, 'Token not valide');
  let userObject;
  try {
    userObject = jwt.verify(token);
  } catch (err) {
    ctx.assert(userObject, 401, 'Token not verifyed');
  }
  const user = await User.findOne({ _id: userObject.userId }).select({ password: 0 });
  ctx.assert(user, 401, 'User not found');
  ctx.state = {
    userId: user._id,
    email: user.email,
  };
  await next();
};

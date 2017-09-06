const Joi = require('joi');
const jwt = require('./jwt');

const authSchema = Joi.object().keys({
  accessToken: [Joi.string(), Joi.number()],
});

module.exports.authenticate = async (token) => {
  Joi.validate({ accessToken: token }, authSchema, err => false);
  let userId = '';
  try {
    userId = jwt.verify(token);
  } catch (err) {
    return false;
  }
  return userId;
};


const Joi = require('joi');

const validator = {
  signupSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    deviceToken: Joi.string().required(),
  }),
  signinSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
module.exports = validator;

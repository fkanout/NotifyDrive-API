/**
 * Created by javascript on 01/10/2016.
 */
'use strict';
const Joi = require('joi');
const jwt = require('./jwt');
const authSchema = Joi.object().keys({
    accessToken: [Joi.string(), Joi.number()],
});

module.exports.authenticate = async function (token) {
    Joi.validate({ accessToken: token }, authSchema,  (err) => false);
    let userId = '';
    try{
       userId = jwt.verify(token);
    } catch (err){
       return false;
    }
    return userId;
};

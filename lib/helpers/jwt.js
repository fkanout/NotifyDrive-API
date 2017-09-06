const jwt = require('jsonwebtoken');

const PASSPHRASE = process.env.PASSPHRASE;

module.exports = {
  sign: payload => jwt.sign(payload, PASSPHRASE),
  verify: payload => jwt.verify(payload, PASSPHRASE),
  decode: token => jwt.decode(token, PASSPHRASE),
};

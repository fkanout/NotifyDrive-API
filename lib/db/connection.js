
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const handler = (msg) => {
  if (process.env.NODE_ENV !== 'TEST') { process.stdout.write(`${JSON.stringify(msg)}\n`); }
  return false;
};
module.exports = {
  connect: connectionURL => mongoose.connect(connectionURL, { useMongoClient: true })
    .then(() => true)
    .catch(() => false),
};
mongoose.connection.on('error', handler);

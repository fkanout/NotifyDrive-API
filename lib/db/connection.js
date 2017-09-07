
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Create the database connection
if (process.env.NODE_ENV === 'TEST') {
  mongoose.connect(process.env.MONGO_DB_URL_TEST, { useMongoClient: true });
} else {
  mongoose.connect(process.env.MONGO_DB_URL, { useMongoClient: true });
}


// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  // console.log(`Mongoose connection open to ${process.env.MONGO_DB_URL}`);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected through app termination');
    process.exit(0);
  });
});

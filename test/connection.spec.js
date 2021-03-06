process.env.NODE_ENV = 'TEST';
require('dotenv').config();

const chai = require('chai');

const expect = chai.expect;


describe('MongoDB', () => {
  it('Should NOT connect to MongoDB with no/wrong URL porvided', (done) => {
    const connection = require('../lib/db/connection').connect('mongodb://ddddd.com');
    connection.then((connected) => {
      expect(connected).to.be.a('boolean');
      expect(connected).to.equal(false);
      done();
    });
  });
  it('Should connect to MongoDB', (done) => {
    const connection = require('../lib/db/connection').connect(process.env.MONGO_DB_URL_TEST);
    connection.then((connected) => {
      expect(connected).to.be.a('boolean');
      expect(connected).to.equal(true);
      done();
    });
  });
});

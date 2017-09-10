process.env.NODE_ENV = 'TEST';
require('dotenv').config();

const chai = require('chai');

const expect = chai.expect;
const should = chai.should();

const amqp = require('../lib/helpers/amqp');

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
describe('RabbitMQ', () => {
  const q = 'testQ';
  it('Should NOT connect to RabbitMQ with wrong URL', (done) => {
    require('amqplib').connect()
      .then()
      .catch((err) => {
        should.exist(err);
        done();
      });
  });
  it('Should sent RabbitMQ msg via TEST queue', (done) => {
    amqp.publish('TEST', q).then(() => done());
  });
});

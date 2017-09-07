process.env.NODE_ENV = 'TEST';

require('dotenv').config();
require('../lib/db/connection');


const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../lib/index');
const User = require('../lib/db/models/user');
const mongoose = require('mongoose');

const should = chai.should();
chai.use(chaiHttp);

const mochaAsync = fn => async (done) => {
  try {
    await fn();
    done();
  } catch (err) {
    done(err);
  }
};
describe('User', () => {
  before((done) => {
    User.remove({}, (err) => {
      should.not.exist(err);
      done();
    });
  });
  describe('POST /signup', () => {
    it('Should create new user', (done) => {
      chai
        .request(server)
        .post('/signup')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ email: 'test@test.test', password: '123' })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(201);
          res.body.should.have.property('token');
          res.type.should.eql('application/json');
          done();
        });
    });
  });
  describe('POST /signin', () => {
    it('Should signin and get a token', (done) => {
      chai
        .request(server)
        .post('/signin')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ email: 'test@test.test', password: '123', device: '1234567890AZERTYUIOP' })
        .end((err, res) => {
          res.status.should.eql(200);
          should.not.exist(err);
          res.body.should.have.property('token');
          res.type.should.eql('application/json');
          done();
        });
    });
  });
});

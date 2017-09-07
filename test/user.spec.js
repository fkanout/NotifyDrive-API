process.env.NODE_ENV = 'TEST';
require('dotenv').config();
require('../lib/db/connection');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../lib/index');
const User = require('../lib/db/models/user');

const should = chai.should();
chai.use(chaiHttp);

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
    it('Should NOT create new user with same email address', (done) => {
      chai
        .request(server)
        .post('/signup')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ email: 'test@test.test', password: '123' })
        .end((err, res) => {
          res.status.should.eql(409);
          done();
        });
    });
  });
  describe('POST /signin', () => {
    it('Should sign in and get a token', (done) => {
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
    it('Should NOT sign in with correct email AND wrong password', (done) => {
      chai
        .request(server)
        .post('/signin')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ email: 'test@test.test', password: '321', device: '1234567890AZERTYUIOP' })
        .end((err, res) => {
          should.exist(err);
          res.status.should.eql(401);
          done();
        });
    });
    it('Should NOT sign in with wrong credentials', (done) => {
      chai
        .request(server)
        .post('/signin')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ email: 'test@notest.test', password: '321', device: '1234567890AZERTYUIOP' })
        .end((err, res) => {
          should.exist(err);
          res.status.should.eql(401);
          done();
        });
    });
  });
  describe('CHECK TOKEN', () => {
    let token = '';
    before((done) => {
      chai
        .request(server)
        .post('/signin')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ email: 'test@test.test', password: '123', device: '1234567890AZERTYUIOP' })
        .end((err, res) => {
          should.not.exist(err);
          res.body.should.have.property('token');
          res.type.should.eql('application/json');
          const result = JSON.parse(res.text);
          token = result.token;
          done();
        });
    });
    it('Shoud valide the sent Token in header and return success', (done) => {
      chai
        .request(server)
        .get('/checktoken')
        .set('Authorization', token)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.body.should.have.property('success', true);
          done();
        });
    });
  });
});

process.env.NODE_ENV = 'TEST';

require('dotenv').config();
require('../lib/db/connection');


const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../lib/index');
const Car = require('../lib/db/models/car');

const should = chai.should();
chai.use(chaiHttp);

describe('Car', () => {
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
  before((done) => {
    Car.remove({}, (err) => {
      should.not.exist(err);
      done();
    });
  });

  describe('POST /cars/:plateNumber', () => {
    it('Should add a new car', (done) => {
      chai
        .request(server)
        .post('/cars/:plateNumber')
        .set('Authorization', token)
        .query('ck234dq')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          plate: 'ck234dq',
          mark: 'RENAULT',
          year: '2017',
          model: 'Twingo',
          department: 92,
        })
        .end((err, res) => {
          should.not.exist(err);
          res.body.should.have.property('plate', 'ck234dq');
          res.body.should.have.property('mark', 'RENAULT');
          res.body.should.have.property('year', 2017);
          res.body.should.have.property('model', 'Twingo');
          res.body.should.have.property('department', 92);
          res.type.should.eql('application/json');
          res.status.should.eql(201);
          done();
        });
    });
    it('Should NOT add a new car with the same plate number ', (done) => {
      chai
        .request(server)
        .post('/cars/ck234dq')
        .set('Authorization', token)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          plate: 'ck234dq',
          mark: 'RENAULT',
          year: '2017',
          model: 'Twingo',
          department: 92,
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.eql(409);
          done();
        });
    });
  });

  describe('GET /cars', () => {
    it('Should return all user\'s car with (A valid token is passed)', (done) => {
      chai
        .request(server)
        .get('/cars')
        .set('Authorization', token)
        .end((err, res) => {
          should.not.exist(err);
          res.body.should.be.a('array');
          res.body.length.should.eql(1);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          done();
        });
    });
    it('Should NOT return all user\'s cars (No valid token is passed)', (done) => {
      chai
        .request(server)
        .get('/cars')
        .set('Authorization', '')
        .end((err, res) => {
          should.exist(err);
          res.status.should.eql(401);
          done();
        });
    });
  });
});

process.env.NODE_ENV = 'TEST';

require('dotenv').config();
require('../lib/db/connection');


const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../lib/index');

const should = chai.should();
chai.use(chaiHttp);

describe('Car', () => {
  let token = '';

  beforeEach((done) => {
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
  describe('GET /cars', () => {
    it('Should return all user\'s car with (A valid token is passed)', (done) => {
      chai
        .request(server)
        .get('/cars')
        .set('Authorization', token)
        .end((err, res) => {
          should.not.exist(err);
          res.body.should.be.a('array');
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          done();
        });
    });
    it('Should not return all user\'s cars (No valid token is passed)', (done) => {
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

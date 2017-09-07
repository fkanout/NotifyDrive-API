process.env.NODE_ENV = 'TEST';

require('dotenv').config();
require('../lib/db/connection');


const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../lib/index');
const Car = require('../lib/db/models/car');

const should = chai.should();
chai.use(chaiHttp);

describe('Notifications', () => {
  let token = '';
  before((done) => {
    chai
      .request(server)
      .post('/signin')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ email: 'test@test.test', password: '123', device: { uuid: '1234567890ABCDEFG' } })
      .end((err, res) => {
        should.not.exist(err);
        res.body.should.have.property('token');
        res.type.should.eql('application/json');
        const result = JSON.parse(res.text);
        token = result.token;
        done();
      });
  });
  describe('GET /sentnotifications', () => {
    it('Should get all the sent notifications', (done) => {
      chai
        .request(server)
        .get('/sentnotifications')
        .set('Authorization', token)
        .end((err, res) => {
          should.not.exist(err);
          res.body.should.be.a('array');
          res.status.should.eql(200);
          done();
        });
    });
  });
  describe('GET /receivednotifications', () => {
    it('Should get all the received notifications', (done) => {
      chai
        .request(server)
        .get('/receivednotifications')
        .set('Authorization', token)
        .end((err, res) => {
          should.not.exist(err);
          res.body.should.be.a('array');
          res.status.should.eql(200);
          done();
        });
    });
  });
});

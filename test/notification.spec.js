process.env.NODE_ENV = 'TEST';

require('dotenv').config();
require('../lib/db/connection');


const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../lib/index');


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
  describe('POST /notifydriver', () => {
    let carId = '';
    let ownerId = '';
    before((done) => {
      chai
        .request(server)
        .get('/cars/ck234dq')
        .set('Authorization', token)
        .query('ck234dq')
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          should.not.exist(err);
          carId = res.body._id;
          ownerId = res.body.owner;
          res.body.should.have.property('plate', 'ck234dq');
          res.body.should.have.property('mark', 'RENAULT');
          res.body.should.have.property('year', 2017);
          res.body.should.have.property('model', 'Twingo');
          res.body.should.have.property('department', 92);
          res.type.should.eql('application/json');
          res.status.should.eql(200);
          done();
        });
    });
    it('Should send a noitification to the user and store the notification in the DB', (done) => {
      chai
        .request(server)
        .post('/notifydriver')
        .set('Authorization', token)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ carId, ownerId, msgSelected: 'TDD', lat: 48.902098, log: 2.314555 })
        .end((err, res) => {
          should.not.exist(err);
          res.body.should.have.property('senderId');
          res.body.should.have.property('receiverId');
          res.body.should.have.property('sentMsg', 'TDD');
          res.body.should.have.property('carPlate');
          res.body.should.have.property('geoLocation');
          res.body.geoLocation.should.have.property('lat', 48.902098);
          res.body.geoLocation.should.have.property('log', 2.314555);
          res.body.geoLocation.should.have.property('fullAddress').oneOf(['44 Boulevard du Général Leclerc, 92110 Clichy, France', 'unlocated']);
          res.body.receivedDevices.should.be.a('array');
          res.type.should.eql('application/json');
          res.status.should.eql(200);
          done();
        });
    });
  });
});

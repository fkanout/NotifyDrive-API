process.env.NODE_ENV = 'TEST';

require('dotenv').config();
require('../lib/db/connection');


const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../lib/index');

const should = chai.should();
chai.use(chaiHttp);


describe('POST /signup', () => {
  it('Should create new user', (done) => {
    chai
      .request(server)
      .post('/signup')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ email: 'test@test.test', password: '123' })
      .end((err, res) => {
        should.not.exist(err);
        res.type.should.eql('application/json');
        done();
      });
  });
});


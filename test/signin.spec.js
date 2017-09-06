process.env.NODE_ENV = 'TEST';

require('dotenv').config();
require('../lib/db/connection');


const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../lib/index');

const should = chai.should();
chai.use(chaiHttp);


describe('POST /signin', () => {
  it('Should signin', (done) => {
    chai
      .request(server)
      .post('/signin')
      .set('auth', 'foobar')

      .end((err, res) => {
        should.not.exist(err);
        res.body.should.be.a('array');
        res.type.should.eql('application/json');
        done();
      });
  });
});


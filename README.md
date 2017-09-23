
# NOTIFY DRIVER - API
<img src="https://github.com/fkanout/NotifyDrive-API/raw/f5fa8499493509611fc7fe4df30e5afbfa1ffffc/assets/logo.png" width="250" height="250">


[![codecov](https://codecov.io/gh/fkanout/NotifyDrive-API/branch/master/graph/badge.svg)](https://codecov.io/gh/fkanout/NotifyDrive-API)
[![Build Status](https://travis-ci.org/fkanout/NotifyDrive-API.svg?branch=master&style=flat)](https://travis-ci.org/fkanout/NotifyDrive-API)
[![Known Vulnerabilities](https://snyk.io/test/github/fkanout/NotifyDrive-API/badge.svg?style=flat)](https://snyk.io/test/github/fkanout/NotifyDrive-API)
[![Dependency Status](https://www.versioneye.com/user/projects/59b2e7ee0fb24f004e1a5ae9/badge.svg?style=flat)](https://www.versioneye.com/user/projects/59b2e7ee0fb24f004e1a5ae9)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)


*Notify Driver is a mobile app that allows drivers and road users to get in touch in case a parked car is either disturbing or facing an issue.*

For example, a user can alert a car's owner that his car is being stolen or that he/she forgot to turn off the lights. Or, a driver can alert another driver that he/she is parked in front of his/her parking exit and that if she/he doesn't come to move it, police will be alerted within 10 minutes.


# STACK 

`Restful API using EcmaScript6`

`Node 8.x` 

`Koa2, Koa-router`

`RabbitMQ`

`Seneca microservice toolkit`

`MongoDB` Database

`Joi` Object schema description language and validator for JavaScript objects.

`Mocha` Test framework

`Chai` BDD / TDD assertion library

`Istanbul` Code coverage tool

`Docker` Software container platform

`Travis CI` Continuous integration platform

# ENV variables

`MONGO_DB_URL` DB connection URL

`MONGO_DB_URL_TEST` DB connection URL (Test DB)

`PASSPHRASE` Token signature

`GPSTOADDRESS_URL` GPS to Address microservic's URL

`GPSTOADDRESS_TASK` GPS to Address microservic's task name (inside the HTTP request's header )

`AMQP` RabbitMQ connection URL

`QUEUE` Queue name for push notification

`ENV` Environment variable (`DEV | PROD`)

`NODE_ENV` Node environment variable (`TEST, DEV`)


# Who am I

[Website](https://www.kanout.com)

[Linkedin](https://www.linkedin.com/in/faisalkanout/)

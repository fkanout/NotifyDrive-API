require('./db/connection');

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const json = require('koa-json');
const onerror = require('koa-onerror');
const router = require('./routes');
const cors = require('./helpers/cors');

(() => {
  const app = new Koa();
  onerror(app);
  app
    .use(bodyParser({}))
    .use(json())
    .use(cors());
  router.map(el => app.use(el.routes()));
  if (process.env.NODE_ENV !== 'TEST') {
    app.use(logger());
  }
  module.exports = app.listen(process.env.PORT || 3003);
})();

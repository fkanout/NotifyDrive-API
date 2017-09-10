const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const json = require('koa-json');
const router = require('./routes');
const cors = require('koa2-cors');
const errorHandler = require('koa-better-error-handler');

(() => {
  const app = new Koa();
  app.context.onerror = errorHandler;
  app.context.api = true;
  app
    .use(cors({
      origin: '*',
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
      allowMethods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT', 'PATCH'],
    }))
    .use(bodyParser({}))
    .use(json())
    .use(cors());
  router.map(el => app.use(el.routes()));
  if (process.env.NODE_ENV !== 'TEST') {
    app.use(logger());
  }
  module.exports = app.listen(process.env.PORT || 3003);
})();

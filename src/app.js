require('dotenv').config();
require('./db/connection');

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routes');

const app = new Koa();
app.use(bodyParser({}));
router.map(el => app.use(el.routes()));
app.listen(3003);

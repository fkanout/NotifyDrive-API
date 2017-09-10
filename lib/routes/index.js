const path = require('path');
const router = require('koa-router')();
const fsHelper = require('../helpers/fs');

fsHelper.getFiles(__dirname).filter(el => (el !== path.basename(__filename) && path.extname(el) === '.js'))
  .forEach(el => require(path.join(__dirname, el))(router));
const routers = [];
routers.push(router);
module.exports = routers;

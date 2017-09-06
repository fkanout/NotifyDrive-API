const path = require('path');
const router = require('koa-router')();
const fsHelper = require('../helpers/fs');

fsHelper.getFiles(__dirname).filter(el => (el !== path.basename(__filename) && path.extname(el) === '.js')).forEach(el => require(path.join(__dirname, el))(router));

const routes = fsHelper.getDirectories(__dirname);

const routers = [];

routes.forEach((el) => {
  const req = require(path.join(__dirname, el));
  if (typeof req === 'object' && req.length) { req.forEach(r => routers.push(r)); } else { routers.push(req); }
},
);

routers.push(router);

module.exports = routers;

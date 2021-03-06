
const fs = require('fs');
const path = require('path');

module.exports.getFiles = function getFile(srcpath) {
  if (!srcpath) { srcpath = './'; }
  return fs.readdirSync(srcpath).filter(file => fs.statSync(path.join(srcpath, file)).isFile());
};

const path = require('path');
const ROOT = path.resolve(__dirname, '..');

function root(...args) {
    return path.join.apply(path, [ROOT].concat(args));
}

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

function isWebpackDevServer() {
  return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
}

exports.root = root;
exports.hasProcessFlag = hasProcessFlag;
exports.isWebpackDevServer = isWebpackDevServer;
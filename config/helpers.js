const path = require('path');
const ROOT = path.resolve(__dirname, '..');

function root(...args) {
    return path.join.apply(path, [ROOT].concat(args));
}

exports.root = root;
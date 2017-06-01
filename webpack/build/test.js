let glob = require('glob');
let path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function getEntry(globPath) {
  let entries = {},
    baseName,
    tmp,
    pathName;
  glob.sync(globPath).forEach(file => {
    let n = file.split('/');
    extname = n[n.length - 2];
    entries[extname] = file;
  })
  return entries;
}
console.log(getEntry(resolve('src/view/pages/**')));
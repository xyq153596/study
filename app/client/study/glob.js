var glob = require('glob');
var path = require('path');
var paths = glob.sync(path.resolve(__dirname, '../src/modules/**/index.js'));
var entries = {}
paths.forEach(function (self, index) {
  var dirName = path.parse(self).dir.split('/').pop();
  entries[dirName] = self;
})
console.log(entries);

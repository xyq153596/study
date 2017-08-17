let tapable = require('tapable');
let tap = new tapable();

tap.plugin('run', function (cb) {
    console.log('run111111');
    return false;
})
tap.plugin('run', function (cb) {
    console.log('run2');
    cb();
})
tap.applyPluginsBailResult("run", err => {

    console.log(111111)

});
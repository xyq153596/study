const runLoader = require('loader-runner');
runLoader.runLoaders({
    resource: '../src/t1.js',
    loaders: ['./helloLoader.js']
}, function (err, result) {
    console.log(result)
})
let loaderUtils = require('loader-utils')

module.exports = function (content) {
    let callback = this.async();
    callback(null, content);

}
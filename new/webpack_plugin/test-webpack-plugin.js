function testWebpackPlugin(options) {

}

testWebpackPlugin.prototype.apply = function (compiler) {
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('optimize-assets', function (assets, next) {
      console.log('assets', assets);
      next();
    })
  })
}

module.exports = testWebpackPlugin;

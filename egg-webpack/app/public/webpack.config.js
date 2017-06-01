let path = require('path');
let ExtractTextWebpackplugin = require('extract-text-webpack-plugin');
let glob = require('glob');

let distPath = resolve('dist'); //输出路径

function resolve(dir) {
  return path.join(__dirname, dir)
}

// 得到入口文件
function getEntry(globPath) {
  let entries = {},
    extname;
  glob.sync(globPath).forEach(file => {
    let n = file.split('/');
    extname = n[n.length - 2];
    entries[extname] = file;
  })
  return entries;
}

const config = {
  entry: getEntry(resolve('src/**/*.js')),
  output: {
    filename: '[name]/index.js', //js输出
    path: distPath
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextWebpackplugin.extract([
        "css-loader",
        "sass-loader"
      ])
    }]
  },
  plugins:[
    new ExtractTextWebpackplugin('[name]/style.css')
  ]
}

module.exports = config;
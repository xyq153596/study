let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextWebpackplugin = require('extract-text-webpack-plugin');
let glob = require('glob');

let distPath = resolve('dist'); //输出路径
let plugins = [];
plugins.push(new ExtractTextWebpackplugin("[name]/styles.css"));

function resolve(dir) {
  return path.join(__dirname, '..', dir)
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
// 得到html输出配置
function getHtml(globPath) {
  let list = [],
    extname, filename;
  glob.sync(globPath).forEach(file => {
    filename = path.basename(file, '.hbs');
    extname = path.dirname(file).split('/').pop();
    list.push({
      filename: path.join(distPath, extname, filename + '.html'),
      template: file
    })
  });
  return list;
}

getHtml(resolve('src/view/pages/**/*.hbs')).forEach(option => {
  plugins.push(new HtmlWebpackPlugin(option));
})

const config = {
  entry: getEntry(resolve('src/view/pages/**/*.js')),
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
      },
      {
        test: /\.hbs$/,
        use: [{
          loader: 'handlebars-loader',
          query: {
            partialDirs: [
              resolve('src/view/partials')
            ]
          }
        }]
      }
    ]
  },
  // plugins: 
  plugins: plugins
}

module.exports = config;
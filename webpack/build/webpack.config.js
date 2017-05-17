let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextWebpackplugin = require('extract-text-webpack-plugin');

let distPath = resolve('dist');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
const config = {
  entry: {
    header: resolve('src/components/header/index.js')
  },
  output: {
    filename: '[name].js',
    path: resolve('dist')
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
          loader: 'handlebars-loader'
        }]

      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'test.html',
      template: resolve('src/components/header/view.hbs')
    }),
    new ExtractTextWebpackplugin("styles.css")
  ]
}

module.exports = config;
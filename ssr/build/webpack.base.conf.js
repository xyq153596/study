const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: './dist'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: "vue-loader",
      options: {
        extractCSS: true
      },
      exclude: /node_modules/i
    }, {
      test: /\.js$/,
      loader: "babel-loader",
      exclude: /node_modules/i
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", "sass-loader"]
      })
    }]
  },
  plugins: [new ExtractTextPlugin({
    filename: 'common.[chunkhash].css'
  })]
}
let path = require('path');

let testWebpackPlugin = require('./plugins/TestWebpackPlugin');
let $src = path.resolve(__dirname, 'src/');
let $dist = path.resolve(__dirname, 'dist/');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        index: './src/view/index',
        detail: './src/view/detail'
    },
    output: {
        filename: '[name].[chunkhash:8].js',
        path: path.resolve($dist)
    },
    plugins: [new testWebpackPlugin('神经病啊'), new cleanWebpackPlugin(['dist']),new htmlWebpackPlugin({
        filename:'index.html'
    })],
    module: {
        rules: [{
            test: /\.js$/,
            use: ['./loader/testLoader', './loader/helloLoader'],
            exclude: /(node_modules)/
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.art$/,
            use: 'art-template-loader'
        }]
    }
}
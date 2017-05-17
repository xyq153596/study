let path = require('path');

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
        use: [{
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.hbs$/,
        use: [{
          loader: 'handlebars-loader'
        }]
      }
    ]
  }
}

module.exports = config;
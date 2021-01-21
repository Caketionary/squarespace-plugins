const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: "production",
  entry: {
    app: [
        "jquery",
        path.resolve(__dirname, 'src/index.js')
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  }
};
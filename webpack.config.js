const path = require('path');

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  entry: {
    app: [
      'jquery',
      path.resolve(__dirname, 'src/index.js'),
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};

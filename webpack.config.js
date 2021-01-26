const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  entry: {
    'common/vendor': [
      'jquery',
    ],
    'styles/add-on': [
      path.resolve(__dirname, 'src/styles/index.scss'),
    ],
    'pages/cake-product-item': {
      import: path.resolve(__dirname, 'src/page/CakeProductItem/index.js'),
      dependOn: 'common/vendor',
    },
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};

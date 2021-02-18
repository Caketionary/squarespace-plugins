const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  resolve: {
    alias: {
      jquery: require.resolve('jquery'),
    },
  },
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
      'jquery-nice-select',
    ],
    'styles/add-on': [
      path.resolve(__dirname, 'src/styles/index.scss'),
    ],
    'pages/cake-product-item': {
      import: path.resolve(__dirname, 'src/page/CakeProductItem/index.js'),
      dependOn: 'common/vendor',
    },
    'pages/cake-search': {
      import: path.resolve(__dirname, 'src/page/CakeSearch/index.js'),
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

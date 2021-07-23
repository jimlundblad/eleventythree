const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // Our "entry" point
  entry: './src/site/_includes/js/core.js',
  output: {
    // Where webpack will compile the assets
    path: path.resolve(__dirname, 'src/site/scripts'),
    // Name the chunks
    chunkFilename: '[name].[contenthash].js'
  },
  module: {
    rules: [
      
    ],
  },
  // Any `import`s from `node_modules` will compiled in to a `vendor.js` file.
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
};
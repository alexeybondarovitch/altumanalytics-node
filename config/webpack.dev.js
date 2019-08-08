const merge = require('webpack-merge');
const config = require('./webpack.common.js');

const devConfig = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: '[name]-node.js',
  }
});

module.exports = devConfig;

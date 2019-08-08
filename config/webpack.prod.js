const merge = require('webpack-merge');
const config = require('./webpack.common.js');

const prodConfig  = merge(config, {
  mode: 'production',
  output: {
    filename: '[name]-node.min.js',
  }
});

module.exports = prodConfig;

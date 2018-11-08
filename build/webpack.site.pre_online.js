var webpackConfig = require('./webpack.site.base.js');
var webpack = require('webpack');

webpackConfig.plugins && webpackConfig.plugins.unshift(
    new webpack.DefinePlugin({
        ENV: JSON.stringify('pre_online')
    })
);
module.exports = webpackConfig;
var webpackConfig = require('./webpack.site.base.js');
var webpack = require('webpack');
var extend = require('util')._extend;

webpackConfig.plugins && webpackConfig.plugins.unshift(
    new webpack.DefinePlugin({
        ENV: JSON.stringify('rd')
    })
);


extend(webpackConfig.output, {
    filename: '[name].js',
    chunkFilename: '[name].js'
});


module.exports = webpackConfig;
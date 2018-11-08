var webpackConfig = require('./webpack.site.base.js');

var domainOnlineCdn = (function(){
  var start = 1;
  var end = 4;
  var domain = [];

  for(var i = start; i <= end; i++){
    domain.push('http://js' + i + '.rongyi.com/fe/webroot');
  }

  return domain;

 })();
// webpackConfig.output.publicPath = 'http://js1.rongyi.com/fe/webroot' 
  // + webpackConfig.output.publicPath;

module.exports = webpackConfig;
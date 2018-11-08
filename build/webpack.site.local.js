var path = require('path');
var projectRoot = process.cwd();
console.log("projectRoot",projectRoot);
var webpackConfig = require('./webpack.site.base.js');

var webpack = require('webpack');
var extend = require('util')._extend;
var babel = require("babel-core");
webpackConfig.devtool = 'source-map';

webpackConfig.plugins && webpackConfig.plugins.unshift(
  new webpack.DefinePlugin({
    ENV: JSON.stringify('local')
  })
);

extend(webpackConfig.output, {
  path: path.resolve(projectRoot, './output/'),
  publicPath: '/',
  filename: '[name].js',
  chunkFilename: '[name].js'
});

// let target = 'http://fe2.rongyi.com:8088';
let target = 'http://fe1.rongyi.com:8088';


webpackConfig.devServer = {
  host: "localhost",
  port: 8899,
  historyApiFallback: true,
  stats: 'errors-only',
  proxy: {
    '^/bsoms/**': {
        target: target,
        changeOrigin: 'true'
    },
    '^/lightning-coupon-service/**': {
        target: target,
        changeOrigin: 'true'
    },
    '^/lightning-mall-service/**': {
        target: target,
        changeOrigin: 'true'
    },
    '^/lightning-settle/**': {
        target: target,
        changeOrigin: 'true'
    },
    '^/easy-roa/**': {
        target: target,
        changeOrigin: 'true'
    },
    '^/merchant/**': {
      target: target,
      changeOrigin: 'true'
    },
    '^/easy-shop-management/**': {
      target: target,
      changeOrigin: 'true'
    },
    '^/babel/**': {
      target: 'http://localhost:14000',
      secure: false,
      changeOrigin: 'true',
      onProxyRes:function(proxyRes, req, res) {
        //登录处理
        var result = babel.transform(`export default {data(){return {}},
            render(h){
              if(this.column.multipleSelection){ // 多选
                  return (
                      <div class="yii-table-cell" style="text-align: center;">
                          <yii-checkbox 
                              label={ this.selectKey ? this.line[this.selectKey] : this.row} 
                              disabled={ this.column.selectDisable ? this.column.selectDisable(this.line, this.row, this.column, this.col) : false }></yii-checkbox>
                      </div>
                  );
              }else if(!this.column.render){ // 普通列
                  return (
                      <div class="yii-table-cell">{ this.dictionaryShow() }</div>
                  );
              }else if(this.column.render){ // 自定义列
                  return (
                      <div class="yii-table-cell">{ this.column.render({line: this.line, column: this.column, row: this.row, col: this.col}) }</div>
                  );
              }
          }
        }`, {
          "presets": [
            ["env", {
              modules: false
            }]
          ],
          "plugins": ["transform-runtime", "transform-vue-jsx", "transform-object-rest-spread"]
        }) ;
        console.log("code",result.code);
      },
      pathRewrite:{"^/casion":""}
    },
    '^/casionj/**': {
      target: "http://localhost:8099/tongxiang",
      changeOrigin: true,
      pathRewrite:{"^/casionj":""},
      onProxyReq:function(proxyReq, req, res) {
        // console.log("proxyReq===",proxyReq);
        //console.log("req===",req);
      }
    },
    '^/casion/**': {
      target: "http://localhost:14000",
      changeOrigin: 'true',
      pathRewrite:{"^/casion":""}
    }
  }
};

module.exports = webpackConfig;


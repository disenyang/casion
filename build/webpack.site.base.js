
const utils = require('./utils');
const path = require('path');
const projectRoot = process.cwd();
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

let moduleName = 'casion_fe';
let staticName = `static_${moduleName}`;

module.exports = {
  entry: "./public/main/app.js",

  output: {
    libraryTarget: 'var',
    path: path.resolve(projectRoot, './output/' + staticName + '/'),
    publicPath: '/' + staticName + '/',
    filename: '[name]_[hash:8].js',
    chunkFilename: '[name]_[hash:8].js'
  },
  

  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './business/index.html',
      filename: 'index.html'
    }),

    new webpack.DefinePlugin({
      ENV: JSON.stringify('online'),
      MODULE_NAME: JSON.stringify(moduleName)
    }),

    // new ExtractTextPlugin('style.css')
  ],

  module: {
    rules: [
      {
        test: /\.vue$/i,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: false
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.(jpg|png|gif|svg|ttf|woff|eot)\??.*$/,
        loaders: ['url-loader?limit=10000&name=[path][name]_[hash:8].[ext]']
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ]
  },

  resolve: {
    modules: [
      "node_modules",
      path.resolve(projectRoot),
      utils.getNodePath()
    ],
    extensions: ['.webpack.js', '.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'utils': 'public/utils/index.js',
      'stores': 'public/stores/index.js',
      'jquery': 'public/utils/jquery.min.js',
      'mock': 'mock'
    }
  },
  node: {
    fs: "empty"
  }
};
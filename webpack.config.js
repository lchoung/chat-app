var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'static');
var APP_DIR = path.resolve(__dirname, 'app/js');
var IMAGE_DIR = path.resolve(__dirname, 'app/images');
var STYLE_DIR = path.resolve(__dirname, 'app/css');

var config = {
  entry : APP_DIR + '/App.js',
  output : {
    path : BUILD_DIR,
    filename : 'bundle.js'
  },
  module : {
    loaders : [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel'
      },
      {
        test: /\.jpg?/,
        include: IMAGE_DIR,
        loader: 'file-loader?name=images/[name].[ext]',
      },
      {
        test: /\.css$/,
        include: STYLE_DIR,
        loader: "style-loader!css-loader?name=styles/[name].[ext]",
      }
    ]
  },
};

module.exports = config;

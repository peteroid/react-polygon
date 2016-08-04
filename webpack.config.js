var Webpack = require('webpack')
var _extend = require('util')._extend

var commonConfig = {
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      }
    ]
  },
  output: {
    path: __dirname,
    filename: "[name].js"
  }
}

var dist = {
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      }
    ]
  },
  entry: {'dist/Pentagon': './src/components/Pentagon.js'},
  output: {
    libraryTarget: "umd",
    library: "Pentagon",
    path: __dirname,
    filename: "[name].js"
  },
  externals: {
    react: "react"
  }
}

var app = _extend({entry: {'build/app': './src/index.js'}}, commonConfig)

module.exports = [dist, app]


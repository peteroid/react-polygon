var Webpack = require('webpack')
var _extend = require('util')._extend

var app = {
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
  entry: {'build/app': './src/index.js'},
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
  entry: {'dist/Polygon': './src/components/Polygon.js'},
  output: {
    libraryTarget: "umd",
    library: "Polygon",
    path: __dirname,
    filename: "[name].js"
  },
  externals: {
    react: "react"
  }
}

module.exports = [dist, app]


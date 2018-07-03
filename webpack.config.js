const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var app = {
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },
  entry: {'build/app': './src/index.js'},
  output: {
    path: __dirname,
    filename: '[name].js'
  }
}

var dist = {
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },
  entry: {'dist/Polygon': './src/components/Polygon.js'},
  output: {
    libraryTarget: 'umd',
    library: 'Polygon',
    path: __dirname,
    filename: '[name].js'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
        }
      })
    ]
  },
  externals: {
    react: 'react'
  }
}

module.exports = [dist, app]

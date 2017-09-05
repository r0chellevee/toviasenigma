var path = require('path');
var webpack = require('webpack');


module.exports = {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, '/src/dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: ['babel-loader', 'react-hot-loader/webpack'],
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.css$/,
      loader: 'style-loader'
    }, 
    {
      test: /\.css$/,
      loader: 'css-loader',
      query: {
        modules: true
      }
    },
    {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }]
  }
};
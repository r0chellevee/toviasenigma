var path = require('path');
var webpack = require('webpack');


module.exports = {
  devtool: 'cheap-module-source-map',
  entry: 
    './src/index.js',
  output: {
    path: path.join(__dirname, '/src/dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NOVE_ENV': JSON.stringify('production')
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: ['babel-loader'],
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
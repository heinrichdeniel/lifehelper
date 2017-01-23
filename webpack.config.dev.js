var webpack = require('webpack');
var path = require('path');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    path.join(__dirname, 'src/index.js')
  ],
  resolve: {
    root: path.resolve('src'),
    extensions: ['', '.js', '.json']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new TransferWebpackPlugin([
      {from: 'src/assets/fonts', to: 'assets/fonts'},
      {from: 'src/assets/img', to: 'assets/img'},
      {from: 'src/assets', to: ''}
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {test: /(\.css)$/, loaders: ['style', 'css?modules', 'postcss']},
      {test: /\.scss$/, loaders: [
        'style',
        'css?modules&&importLoaders=1&localIdentName=[name]---[local]---[hash:base64:5]',
        'postcss',
        'sass?sourceMap']
      },
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      {test: /\.(png|jpg|gif|pdf)$/, loader: 'url?limit=8192'}
    ]
  },
  postcss: [
    require('autoprefixer'),
    require('postcss-modules-values')
  ]
};

import webpack from "webpack";
import path from "path";
import TransferWebpackPlugin from 'transfer-webpack-plugin';

export default {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    './src/index'
  ],
  resolve: {
      root: path.resolve('src'),
      extensions: ['', '.js', '.jsx', '.json']
  },
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './'
  },
  plugins: [
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
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
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

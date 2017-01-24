
var express = require('express');
var path = require('path');

/* eslint-disable no-console */

var PORT = process.env.PORT || 3000;
var app = express();

if(process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-server');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpack = require('webpack');
  var config = require('./webpack.config.dev');
  var compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.info("Listening on port %s.", PORT);
  }
});

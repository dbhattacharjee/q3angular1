var gzippo = require('gzippo');
  var express = require('express');
  var app = express();
 
  //app.use(express.logger('dev'));
  alert(__dirname);
  app.use(gzippo.staticGzip("/dist"));
  app.listen(process.env.PORT || 5000);

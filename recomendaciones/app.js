
/**
 * Module dependencies.
 */

var express = require('express')
  //, routes = require('./routes')
  , recomendacion = require('./routes/recomendacion')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/recomendacion/usuario/:id', recomendacion.get);
app.put('/recomendacion/activar_regla/:id', recomendacion.setRule);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

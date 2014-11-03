var express = require("express"),
    app     = express(),
    http    = require("http"),
    server  = http.createServer(app),
    mongoose = require('mongoose');

routes = require('./routes.js')(app);

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.post('/factura', crearFactura); 
//app.get('/factura/:id', obtenerFactura);

var connection = mongoose.connect('mongodb://localhost:32000', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

server.listen(4000, function() {
  console.log("Node server running on http://localhost:4000");
});



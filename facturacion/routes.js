module.exports = function(app) {
	var Factura = require('./factura.js');
	var http = require('http');
	var Client = require('node-rest-client').Client;
  	calcularImpuesto = function(importe) {
  		return importe * 0.21;

  	}
  	crearFactura = function(req, res) {
    	var articuloSolicitado = req.body.articulos[0];
		var url = "http://localhost:3000/articulo/"+articuloSolicitado.id;
		http.get(url, function(resHttp) {
			var body = '';
		    resHttp.on('data', function(chunk) {
		        body += chunk;
		    });

		    resHttp.on('end', function() {
		        var articulo = JSON.parse(body);
				var factura = new Factura();
				if (!articulo){
					console.log("Error al obtener el precio del articulo");
			      	return res.send("Error al obtener el precio del articulo", 500);
				}

				if (!articulo.precio>0){
					console.log("Error al obtener el precio del articulo");
			      	return res.send("Error al obtener el precio del articulo", 500);
				}
				var articuloAInsertar = 
					{'descripcion':articulo.descripcion,
					'cantidad':articuloSolicitado.cantidad,
					'precio_unitario':articulo.precio};
				
				factura.articulos.push(articuloAInsertar);
				factura.cliente = req.body.cliente;
	            factura.subtotal = articuloSolicitado.cantidad * articulo.precio;
	            factura.impuesto = calcularImpuesto(factura.subtotal);
	            factura.total = factura.subtotal + factura.impuesto;
	            Factura.findOne({}).sort('-numero').exec(function(err, mayor) { 
			      var numero;
			      if (mayor){
			        numero = parseInt(mayor.numero) + 1;  
			      } else {
			        numero = 1;
			      }
			      factura.numero = numero;
			      factura.save(function(err) {
			      	if (err){
			      		console.log("Error al guardar factura");
			      		return res.send("Error al guardar factura", 500);
			      	} else{
			      		return res.send(numero, 200);
			      	}
			      });
	        	});    
		    });
			
        }).on('error', function(e) {
		      console.log("Got error: ", e);
		});

  	}
  	obtenerFacturas = function(req,res){
  		Factura.find({}, function (err, facturas){
	        if (err) return res.send(err, 500);
	        res.send(facturas, 200);
	      });
  	}
  	obtenerFactura = function(req,res){
  		Factura.findOne({numero:req.params.numero}, function (err, factura){
	        if (err) return res.send(err, 500);
	        if (!factura) return res.send('No se encuentra la factura', 404);
	        res.send(factura, 200); 
	      });
  	}
}
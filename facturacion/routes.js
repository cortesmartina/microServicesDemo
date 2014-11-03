module.exports = function(app) {
	var Factura = require('./factura.js');
	var Client = require('node-rest-client').Client;
  	crearFactura = function(req, res) {
    	var articuloSolicitado = req.body.articulos[0];
		var restClient = new Client();
		var url = "localhost:3000/articulo/"+articuloSolicitado.id;
		console.log(url);
		restClient.get(url, function(data, articulo){
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
  	}
}
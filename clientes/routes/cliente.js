
/*
 * GET users listing.
 */

var clientes = [
    {id:1, nombre: "Juan Carlos Garcia",email: "jcg@utn.edu.ar", tipo_cliente: "comun" },
    {id:2, nombre: "Aerolineas Argentinas SA",email: "recalde@aa.com.ar", tipo_cliente: "iva exento" },
    {id:3, nombre: "Nicolas Far",email: "nicofakemail@gmail.com", tipo_cliente: "iva exento" },
    {id:4, nombre: "Emanuel Ginobili",email: "manu@spurs.com", tipo_cliente: "comun" },
    {id:5, nombre: "Lionel Messi",email: "lio@barcelonafc.es", tipo_cliente: "iva exento" },
];

exports.getAll = function(req, res){
  res.json(productos);
};

exports.get = function(req, res){
    var index =parseInt(req.params.id);
    if (index < 1 || index > clientes.length) res.send(400);
    res.json(clientes[index -1 ]);
};
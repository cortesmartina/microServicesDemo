
/*
 * GET users listing.
 */

var productos = [
    {id:1, nombre: "Coca Cola 2L",precio: 12.35, descripcion: "Destapa Felicidad" },
    {id:2, nombre: "RedBull Lata",precio: 10.99, descripcion: "RedBull te da Alas!" },
    {id:3, nombre: "Quilmes 1L",precio: 8.15, descripcion: "El Sabor del Encuentro" },
    {id:4, nombre: "Manaos 1L",precio: 2.50, descripcion: "Vamos Manaos!" },
    {id:5, nombre: "Kohinoor ",precio: 599.90, descripcion: "Poderoso el Chiquitin" },
];

exports.getAll = function(req, res){
  res.json(productos);
};

exports.get = function(req, res){
    var index =parseInt(req.params.id);
    if (index < 1 || index > productos.length) res.send(400);
    res.json(productos[index -1 ]);
};

/*
 * GET users listing.
 */
var fs = require ("fs");

var regla = "favoritos";


function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}


exports.get = function(req, res){
    var recomendaciones = readJsonFileSync("recomendaciones.json");
    console.log(req.params.id);
    for (var i=0; i< recomendaciones.length; i++){
        var recomendacion= recomendaciones[i];
        console.log(recomendacion);

        if (recomendacion.usuario == req.params.id){
            res.json(recomendacion[regla]);
            return;
        }
    }
};

exports.setRule = function(req, res){

    if (req.params.id== 0){
        regla = "favoritos";
    }else{
        regla = "recomendados";
    }
    res.send(200);

};
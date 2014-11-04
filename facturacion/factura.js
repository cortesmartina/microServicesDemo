var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var facturaSchema = new Schema({
  numero:   {type: String},
  cliente : { type : String },
  articulos:   [ { descripcion: { type : String } , cantidad: { type : Number } , precio_unitario: { type : Number } } ],
  subtotal:   {type: Number},
  total:    {type: Number}
});

module.exports = mongoose.model('Factura', facturaSchema);
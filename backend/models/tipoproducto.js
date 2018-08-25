"use strict"
var mongose = require("mongoose");
var Schema = mongose.Schema;
var TipoProductoSchema = Schema({
    tipo:String
})
module.exports = mongose.model("TipoProductos", TipoProductoSchema)
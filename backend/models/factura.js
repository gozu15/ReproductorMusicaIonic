"use strict"
var mongose = require("mongoose");
var Ventas=require("./venta");
var Schema = mongose.Schema;
var FacturaSchema = Schema({
    fecha:String,
    precio:Number,
    ventas:[String]
})
module.exports = mongose.model("Facturas", FacturaSchema)
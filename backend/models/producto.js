"use strict"
var mongose = require("mongoose");
var Schema = mongose.Schema;
var ProductoSchema = Schema({
    nombre:String,
    precio:Number,
    foto:{nombre:String, contentType: String },
    descripcion:String,
    tipo: { type: Schema.ObjectId, ref: "TipoProductos" },
    usuario: { type: Schema.ObjectId, ref: "Usuarios" },
    cantidad:Number,
    estado:String,
})
module.exports = mongose.model("Productos", ProductoSchema)
"use strict"
var mongose = require("mongoose");
var Schema = mongose.Schema;
var VentaSchema = Schema({
    fecha:String,
    precio:Number,
    producto: { type: Schema.ObjectId, ref: "Productos" },
    usuario:{type: Schema.ObjectId, ref: "Usuarios" }
})
module.exports = mongose.model("ventas", VentaSchema)
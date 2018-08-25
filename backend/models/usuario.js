"use strict"
var mongose = require("mongoose");
var Schema = mongose.Schema;
var UsuariosSchema = Schema({
    nombre:String,
    apellidos:String,
    usuario: String,
    password: String,
    telefono:Number,
    direccion:String,
    correo:String,
    foto:{nombre:String, contentType: String },
    rol: { type: Schema.ObjectId, ref: "Roles" } 

})
module.exports = mongose.model("Usuarios", UsuariosSchema)
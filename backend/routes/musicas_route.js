"use strict"
var express = require("express");
var musicasControler = require("../controllers/musicas_cotroller");
var api = express.Router();

//rtutas http para accedar a los metodos del controlador de ventas
//llamar usando url/api/ventas -- debuelve lista de ventas

//llamar usando url/api/ventas/create  guarda los datos de la venta
api.get("/",musicasControler.getMusic);
api.post("/",musicasControler.getCanciones);
api.post("/download",musicasControler.descargarMusicas);
//llamar usando url/api/ventas/idventa obtiene una venta en especifico

module.exports = api;
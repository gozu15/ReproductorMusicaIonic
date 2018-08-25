"use strict"
var express = require("express");
var Emailcontroller = require("../controllers/mail_controller");
var api = express.Router();

//rtutas http para accedar a los metodos del controlador de ventas
//llamar usando url/api/ventas -- debuelve lista de ventas

//llamar usando url/api/ventas/create  guarda los datos de la venta
api.post("/send",Emailcontroller.SendMail);
//llamar usando url/api/ventas/idventa obtiene una venta en especifico

module.exports = api;
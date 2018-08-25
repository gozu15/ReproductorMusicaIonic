"use strict"
var express = require("express");
var bodypaserser = require("body-parser");
var app = express();
app.use(bodypaserser.urlencoded({ extended: false }));
app.use(bodypaserser.json());
// middleware para permitir o denegar acceso a pagias usar la API
app.use(function (req, res, next) {

    // Sitio web que desea permitir que se conecte
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.10.247:8100');

    //Solicite los métodos que desea permitir
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Solicitar encabezados que desees permitir
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pase a la siguiente capa de middleware
    next();
});
//Rutas de Acceso a los controladores
var userroute=require("./routes/usuarios_route");
var productroute=require("./routes/producto_route");
var ventaroute=require("./routes/venta_route");
var mailroute=require("./routes/mail.route");
var musicasroute=require("./routes/musicas_route");

app.use("/api/musicas",musicasroute);
app.use("/api/usuarios",userroute);
app.use("/api/productos",productroute);
app.use("/api/ventas",ventaroute);
app.use("/api/mail",mailroute);
//Modulo a exportar
module.exports = app;
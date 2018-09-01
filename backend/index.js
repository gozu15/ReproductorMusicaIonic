"use strict"
/*var mongoose = require("mongoose");
var app = require("./app");
var port = process.env.port || 2321;

//mongodb://wilson-pc:wilsonpc123@ds263460.mlab.com:63460/tienda2
//conexion ala bd de mongo, en este caso alojado en mlab.com
mongoose.connect('mongodb://wilson-pc:wilsonpc123@ds263460.mlab.com:63460/tienda2', (error, respuesta) => {
    //ruta del servidor y seguido el nombre de la bd
  // mongoose.connect('mongodb://127.0.0.1:27017/Node', (error, respuesta) => {
        if (error) {
            throw error;
        } else {
            console.log("correcta");
            //lanzar el servior
            app.listen(port, function() {
                console.log("servidor del api rest en puerto 2321");
            })
        }
    });*/
    var mongoose = require("mongoose");
    var app = require("./app");
    var port = process.env.port || 2321;

    app.listen(port, function() {
        console.log("servidor del api rest en puerto 2321");
    })
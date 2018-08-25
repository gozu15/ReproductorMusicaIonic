"use strict"
var express = require("express");
var productcontroller = require("../controllers/producto_controller");
var api = express.Router();
var multipart = require("connect-multiparty");
//middleware para guardar la foto del producto y parsearlo al response http
var fichero = multipart({
    uploadDir: "./resources/image"
});

//Rutas de usado en el HTTP para acceder a los metodos del controlador de producto
//llamar usando url/api/productos -- debuelve lista de producto
api.get("/",productcontroller.GetProductos);
//llamar usando url/api/productos/create para crear los producto, recibe datos enviados por forms data
api.post("/create",fichero,productcontroller.create);
//llamar usando url/api/productos/create para crear los tipos de producto recibe datos enviados por x-www-form-urlencoded
api.post("/createtipo",productcontroller.createTipo);
//llamar usando url/api/productos/create/idproducto para actualizar los datos del producto recibe datos por forms data
api.put("/updateproduct/:id",fichero,productcontroller.updated);
//llamar usando url/api/productos/idprodcuto para sacar informacion de un producto en especifico
api.get("/:id",productcontroller.Buscar);
//llamar usando url/api/productos/resources/nombreimagen.jpg para sacar la foto del producto
api.get("/resources/:imagen",productcontroller.Imgen);
    //llamar usando  url/api/productos/deleteprodcut/idprodcuto para borrar un prodcuto
api.delete("/deleteproduct/:id",productcontroller.deleteProduct);
  //llamar usando url/api/productos/filterbytipo para obtener lista de prodcutos con un tipo especifico
api.get("/filterbytipo/:id",productcontroller.FiltrarTipo);
//  //llamar usando  url/api/productos/filterbyname para obtener lista de prodcutos con un nombre especifico
api.post("/filterbyname",productcontroller.FiltrarNombre);
api.post("/deletetipo",productcontroller.DeleteTipo);

api.get("/filterbyuser/:user",productcontroller.FiltrarUsuario);
api.get("/tipos/get",productcontroller.GetTipos);
module.exports = api;
"use strict"
var express = require("express");
var Ventacontroller = require("../controllers/venta_controller");
var api = express.Router();

//rtutas http para accedar a los metodos del controlador de ventas
//llamar usando url/api/ventas -- debuelve lista de ventas
api.get("/",Ventacontroller.GetVentas);
//llamar usando url/api/ventas/create  guarda los datos de la venta
api.post("/create",Ventacontroller.create);
//llamar usando url/api/ventas/idventa obtiene una venta en especifico
api.get("/:id",Ventacontroller.Buscar);
//llamar usando url/api/ventas/filterbyuser/idusuario obtiene las compras de un usuario en especifico
api.get("/filterbyuser/:usuario",Ventacontroller.FiltarPorUsuario);
//llamar usando url/api/ventas/filterbyproduct/idproducto obtiene las las fechas y usuario en las que un producto a sido vendido
api.get("/filterbyproduct/:producto",Ventacontroller.FiltarPorProducto);
api.post("/facturacreate",Ventacontroller.Facturacreate);
api.put("/facturaupdate/:id",Ventacontroller.FacturaUpdate);
api.get("/factura/:id",Ventacontroller.BuscarFactura);
module.exports = api;
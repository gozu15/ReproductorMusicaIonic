"use strict"
var Producto = require("../models/producto");
var Venta = require("../models/venta");
var Usuario = require("../models/usuario");
var Factura = require("../models/factura");
//metodo para obtener lista de ventas
function GetVentas(req, res) {
    //busca en la bd todos los datos obtenidos
    Venta.find({}, function (error, lista) {
        if (error) {
            res.status(500).send({ mensaje: "Error al listar" })
        } else {
            if (!lista) {
                res.status(404).send({ mensaje: "Error al listar" })
            } else {
                //agrega usuario comprador al producto
                Producto.populate(lista, { path: "producto" }, function (err, producto) {
                    //agrea el producto a la venta
                    Usuario.populate(producto, { path: "usuario" }, function (err, venta) {
                        res.status(200).send(venta)
                    });
                });

            }
        }
    });
}

//funcion para crear 
function create(req, res) {
    var ventas = new Venta();
    var params = req.body;
    //pasa los datos recividos al objeto venta
    ventas.fecha = params.fecha;
    ventas.precio = params.precio;
    ventas.producto = params.producto;
    ventas.usuario = params.usuario;
    if (ventas.fecha != null) {
        //guarda en la base de datos la venta realisada
        ventas.save((error, ventas) => {
            if (error) {
                res.status(500).send({ mensjae: "error al guradar" })
            } else {
                res.status(200).send(ventas)
            }
        })
    }
}

//metod para obtener todos los productos comprados por el usuario
function FiltarPorUsuario(req, res) {
    var id = req.params.usuario;
    Venta.find({ usuario: id }, (error, result) => {
        if (error) {
            res.return.status(500).send({ mensaje: "error al buscar" });
        } else {
            if (!result) {
                res.status(404).send({ mensaje: "sin resultado" });
            } else {
                //agrega usuario comprador al producto
                Producto.populate(result, { path: "producto" }, function (err, venta) {
                    //agrega el producto a la venta
                    Usuario.populate(venta, { path: "usuario" }, function (err, venta2) {
                        res.status(200).send(venta2 )
                    });
                });
            }
        }
    })
}


//metod para obtener todos los productos comprados
function FiltarPorProducto(req, res) {
    var id = req.params.producto;
    //buscar los productos comprado
    Venta.find({ producto: id }, (error, result) => {
        if (error) {
            res.return.status(500).send({ mensaje: "error al buscar" });
        } else {
            if (!result) {
                res.status(404).send({ mensaje: "sin resultado" });
            } else {
                //agrega usuario comprador al producto
                Producto.populate(result, { path: "producto" }, function (err, venta) {
                    //agrega el producto a la venta
                    Usuario.populate(venta, { path: "usuario" }, function (err, venta2) {
                        res.status(200).send( venta2 )
                    });
                });
            }
        }
    })
}
//Metodo para buscar una venta especifica
function Buscar(req, res) {

    var id = req.params.id;
    //busca el la base de datos por la id
    Venta.findById(id, (error, result) => {
        if (error) {
            res.return.status(500).send({ mensaje: "error al buscar" });
        } else {
            if (!result) {
                res.status(404).send({ mensaje: "sin resultado" });
            } else {
                //agrega usuario comprador al producto
                Producto.populate(result, { path: "producto" }, function (err, venta) {
                    //agrea el producto a la venta
                    Usuario.populate(venta, { path: "usuario" }, function (err, venta2) {
                        res.status(200).send( venta2 )
                    });
                });
            }
        }
    })
}


function Facturacreate(req, res) {
    var factura = new Factura();
    var params = req.body;
    factura.fecha = params.fecha;
    factura.precio = params.precio;
    factura.ventas =params.ventas;

    factura.save((error, fact) => {
        if (error) {
            res.status(500).send({ mensjae: "error al guradar" })
        } else {
            res.status(200).send({ fact})
        }
    })
}
function FacturaUpdate(req,res){
    var id = req.params.id;
  var factura=new Factura();
       factura._id=id;
       factura.precio=req.body.precio;
       factura.fecha=req.body.fecha;
       factura.ventas=req.body.ventas;
    Factura.findByIdAndUpdate(id, factura, (error, actualizado) => {
        if (error) {
            res.status(500).send({ mensaje: error})
        } else {
            if (!actualizado) {
                console.log(actualizado);
                res.status(404).send({ mensaje: "no se ha actualizado" })
            } else {
                  Factura.findById(id,(error,result)=>{
                      if(error){
                        res.status(404).send({ mensaje: "error no actualizado" })
                      }
                      else{
                          res.status(200).send(result);
                      }
                  })
            }
        }
    }); 
}


function BuscarFactura(req, res) {

    var id = req.params.id;
    //busca el la base de datos por la id
    Factura.findById(id, (error, result) => {
        if (error) {
            res.return.status(500).send({ mensaje: "error al buscar" });
        } else {
            if (!result) {
                res.status(404).send({ mensaje: "sin resultado" });
            } else {
              
                        res.status(200).send(result)
                    
                
            }
        }
    })
}


//exporta los metodos usados en otras partes
module.exports = { GetVentas, create, Buscar, FiltarPorUsuario, FiltarPorProducto, Facturacreate,FacturaUpdate,BuscarFactura }
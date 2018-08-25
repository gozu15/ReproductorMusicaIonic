"use strict"
var Producto = require("../models/producto");
var TipoProducto=require("../models/tipoproducto");
var fs=require("fs");
var path=require("path");
//metodo para crear productos
function GetProductos(req, res){
    //linea para consultar a la base de datos
      Producto.find({},function(error,lista){
        if (error) {
            res.status(500).send({ mensaje: "Error al listar" })
        } else {
            if (!lista) {
                res.status(404).send({ mensaje: "Error al listar" })
            } else {
                //linea para unir productos y tipos de productos
                TipoProducto.populate(lista, {path: "tipo"},function(err, Producto){
                    if (err) {
                        res.status(500).send({ mensaje: "Error al listar" })
                    } else {

                    res.status(200).send(Producto)}
                }); 
               
            }
        }
      });
}


function GetTipos(req, res){
    //linea para consultar a la base de datos
      TipoProducto.find({},function(error,lista){
        if (error) {
            res.status(500).send({ mensaje: "Error al listar" })
        } else {
            if (!lista) {
                res.status(404).send({ mensaje: "Error al listar" })
            } else {
                //linea para unir productos y tipos de producto
                res.status(200).send(lista);
            }
        }
      });
}

//metodo para actualisar prodcutos
function updated(req, res) {
    //linea que recibe la id de la url
    var id = req.params.id;
    var producto=new Producto();
    console.log(req.body);
    //pasar los datos recibidos al objeto prodcuto
        producto._id=id;
        producto.nombre=req.body.nombre;
        producto.precio=req.body.precio;
        producto.descripcion=req.body.descripcion;
        producto.tipo=req.body.tipo;
        producto.estado=req.body.estado;
        producto.cantidad=req.body.cantidad;
        //pregunta si la foto del producto ha sido cambiado
        if(req.files.file!=undefined){
            //guarda la nueva imagen y borra la anterior
            var imagenRuta = req.files.file.path;
            var imagenSplit = imagenRuta.split("\\");
            producto.foto.nombre=imagenSplit[2];
            producto.foto.contentType="imge/jpg";

            var ruta="./resources/image/"+req.body.antiguo;
            fs.unlink(ruta, function(err) {
                if(err){
                }
              
             });
        }
  //consulta el base de datos por la id del producto y la actualisa si existe
    Producto.findByIdAndUpdate(id, producto, (error, actualizado) => {
        if (error) {
            res.status(500).send({ mensaje: error})
        } else {
            if (!actualizado) {
                console.log(actualizado);
                res.status(404).send({ mensaje: "no se ha actualizado" })
            } else {
                Producto.findById(actualizado._id, (error, result) => {
                    if (error) {
                        res.return.status(500).send({ mensaje: "error al buscar" });
                    } else {
                        if (!result) {
                            res.status(404).send({ mensaje: "sin resultado" });
                        } else {
                             //agrega el producto el tipo de producto
                            TipoProducto.populate(result, {path: "tipo"},function(err, prod){
                                res.status(200).send(prod)
                            }); 
                        }
                    }
                })
            }
        }
    }); 
}

//metodo para crear productos
function create(req, res) {
    var Product = new Producto();
   // guarda los datos recibidos en una bariable
    var params = req.body;
    var imagenRuta = req.files.file.path;
    var imagenSplit = imagenRuta.split("\\");
    //pasa los datos recibidos en el objeto producto
    Product.nombre = params.nombre;
    Product.precio=params.precio;
    Product.descripcion=params.descripcion;
    Product.foto.nombre=imagenSplit[2];
    Product.foto.contentType="imge/jpg"
    Product.tipo=params.tipo;
    Product.cantidad=params.cantidad;
    Product.estado=params.estado;
    Product.usuario=params.usuario;
            if (Product.nombre != null) {
                //guarda los datos en la base de datos
                Product.save((error, producto) => {
                    if (error) {
                        res.status(500).send({ mensjae: "error al guradar" })
                    } else {
                        res.status(200).send(producto)
                    }
                })
            }
}

//metodo para enviar imagen al cleinte
function Imgen(req, res){

var imagen=req.params.imagen;
var ruta="./resources/image/"+imagen;
//revisa si el nombre del imagen existe
fs.exists(ruta,function(exists){
    if(exists){
        //envia la imagen
        res.sendFile(path.resolve(ruta))
    }
    else{
        res.status(404).send({mensaje: "la imgen no existe"});
    }
})
}

//metodo para borrar prodcuto
function deleteProduct(req, res) {
    //recibe la id enviado por la url
    var id = req.params.id;
    //verifica la id y lo borra si exite
    Producto.findByIdAndRemove(id, (error, borrado) => {
        if (error) {
            res.return.status(500).send({ mensaje: "error al borrar producto" });
        } else {
            if (!borrado) {
                res.status(404).send({ mensaje: "No se pudo borrar prodcuto" });
            } else {
                //borra la imgen del servidor
                var ruta="./resources/image/"+borrado.foto.nombre;
                fs.unlink(ruta, function(err) {
                    if (err) {
                        return console.error(err);
                    }else{
                        res.status(200).send(borrado);
                    }
                   
                 });
            }
        }
    })
}

//metodo pra enviar los datos de un producto especifico
function Buscar(req,res)
{
    //recice la id enviado por url
    var id = req.params.id;
    //busca en la bd por la id
    Producto.findById(id, (error, result) => {
        if (error) {
            res.status(500).send({ mensaje: "error al buscar" });
        } else {
            if (!result) {
                res.status(404).send({ mensaje: "sin resultado" });
            } else {
                 //agrega el producto el tipo de producto
                TipoProducto.populate(result, {path: "tipo"},function(err, prod){
                    res.status(200).send(prod)
                }); 
            }
        }
    })
}

//funcion para buscar un producto por el nombre
function FiltrarNombre(req,res)
{    
    //recibe el termino enviado
    var Termino = req.body.termino;
    console.log(Termino);
    //busca el termino en la base de datos en la colunnma nombre
    Producto.find({nombre: new RegExp(Termino, 'i')}, (error, result) => {
        if (error) {
            res.status(500).send({ mensaje: error});
        } else {
            if (!result) {
                res.status(404).send({ mensaje: "sin resultado" });
            } else {
           
                //agrega un tipo a la lista de resultado
                TipoProducto.populate(result, {path: "TipoProducto"},function(err, producto){
                    res.status(200).send(producto)
                }); 
            }
        }
    })
}

//metodo para filtrar los productos por su tipo
function FiltrarTipo(req,res){
    var Termino = req.params.id;
    //busca el tipo en la base de datos
  /*  TipoProducto.findOne({tipo:Termino}, (error, result) => {
        if (error) {
            res.status(500).send({ mensaje: "error al busacr" });
        } else {
            if (!result) {
                res.status(404).send({ mensaje: "sin resultado" });
            } else {*/
                    //busca los productos que continen la id recibido por la busqueda anterior
                Producto.find({tipo:Termino}, (error, producto) => {
                    if (error) {
                        res.status(500).send({ mensaje: "error al buscar 2" });
                    } else {
                        if (!producto) {
                            res.status(404).send({ mensaje: "sin resultado 2" });
                        } else {TipoProducto.populate(producto, {path: "TipoProducto"},function(err, product){
                            res.status(200).send(product)
                        }); 
                           
                        }
                    }
                })/*
            }
        }
    })
*/
}

function FiltrarUsuario(req,res){
    var termino = req.params.user;
    console.log(termino);
    //busca el tipo en la base de datos
  
                    //busca los productos que continen la id recibido por la busqueda anterior
                Producto.find({usuario:termino}, (error, producto) => {
                    if (error) {
                        res.status(500).send({ mensaje: "error al buscar 2" });
                    } else {
                        if (!producto) {
                            res.status(404).send({ mensaje: "sin resultado 2" });
                        } else {TipoProducto.populate(producto, {path: "TipoProducto"},function(err, product){
                            res.status(200).send(product)
                        }); 
                           
                        }
                    }
                })
         

}

//metodo para crear tipos
function createTipo(req, res) {
    var TipoProdcuto = new TipoProducto();
    var params = req.body;
    TipoProdcuto.tipo = params.tipo;
    if (params.tipo) {
            if (TipoProdcuto.tipo != null) {
                //guarda el nuevo tipo en la base de datos
                TipoProdcuto.save((error, tipo) => {
                    if (error) {
                        res.status(500).send({ mensjae: "error al guradar" })
                    } else {
                        res.status(200).send(tipo)
                    }
                })
            }

    }
}

function DeleteTipo(){
    var id = req.params.id;
    //busca y borra al tipos por id
    TipoProdcuto.findByIdAndRemove(id, (error, borrado) => {
        if (error) {
            res.status(500).send({ mensaje: "error al borrar tipo" });
        } else {
            if (!borrado) {
                res.status(404).send({ mensaje: "No se pudo borrar tipo" });
            } else {
                          res.status(200).send(borrado);
            }
        }
    })
}

//exporta todos los metodos usados desde otra parte
module.exports = {GetTipos,GetProductos,createTipo,FiltrarNombre,FiltrarTipo,create,updated, deleteProduct,Buscar,Imgen,DeleteTipo,FiltrarUsuario }
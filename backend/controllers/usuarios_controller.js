"use strict"
var bcript = require("bcrypt-nodejs");
var Usuarios = require("../models/usuario");
var Roles=require("../models/rol");
var fs=require("fs");
var path=require("path");

//metodo para sacar todos los usuarios de la base de datos
function GetUsuarios(req, res){
    //sada todos los usuarios de la bd
      Usuarios.find({},function(error,lista){
        if (error) {
            res.status(500).send({ mensaje: "Error al listar" })
        } else {
            if (!lista) {
                res.status(404).send({ mensaje: "Error al listar" })
            } else {
                //agrega un rol al usuario
                Roles.populate(lista, {path: "rol"},function(err, usuarios){
                    res.status(200).send(usuarios)
                }); 
               
            }
        }
      });
}


function GetRoles(req,res){
    //sada todos los roles de la bd
      Roles.find({},function(error,lista){
        if (error) {
            res.status(500).send({ mensaje: "Error al listar" })
        } else {
            if (!lista) {
                res.status(404).send({ mensaje: "Error al listar" })
            } else {
               
                    res.status(200).send(lista)
            
               
            }
        }
      });
}
//Metodos para actualisar datos de un usuario
function updated(req, res) {
    var id = req.params.id;
    var usuario=new Usuarios();
    usuario._id=id;
    usuario.nombre=req.body.nombre;
    usuario.apellidos=req.body.apellidos;
    usuario.usuario=req.body.usuario;
    usuario.telefono=req.body.telefono;
    usuario.direccion=req.body.direccion;
    usuario.correo=req.body.correo;
      //pregunta si la foto del usuario ha sido cambiado
      if(req.files.perfil!=undefined){
        //guarda la nueva imagen y borra la anterior
        var imagenRuta = req.files.perfil.path;
        var imagenSplit = imagenRuta.split("\\");
        usuario.foto.nombre=imagenSplit[2];
        usuario.foto.contentType="imge/jpg";

        var ruta="./resources/profile/"+req.body.antiguo;
        fs.unlink(ruta, function(err) {
            if(err){
            }
          
         });
    }
    //busca y actualisa los datos del usuario
    Usuarios.findByIdAndUpdate(id, usuario, (error, actualizado) => {
        if (error) {
            res.status(500).send({ mensaje: "error al actualizar" })
        } else {
            if (!actualizado) {
                console.log(actualizado);
                res.status(404).send({ mensaje: "no se ha actualizado" })
            } else {
                //envia datos del usuario con los nuevos datos
                Usuarios.findById(usuario._id, (error, result) => {
                    if (error) {
                        res.status(500).send({ mensaje: "error al buscar" });
                    } else {
                        if (!result) {
                            res.status(404).send({ mensaje: "sin resultado" });
                        } else {
                            //agrega un rol al usuario
                            Roles.populate(result, {path: "rol"},function(err, user){
                                res.status(200).send(user)
                            }); 
                        }
                    }
                })
            }
        }
    }); {

    }
}
//funcion para crear usuarios
function create(req, res) {
   // console.log(req.body,req.files.perfil);
    var usuarios = new Usuarios();
    var params = req.body;

    //res.status(200).send({ddd:"xcvbnmnbvcxcvbnm,mnbvcvbn"});;
    //console.log(req.body);
      // guarda los datos recibidos en una bariable
      var params = req.body;
      if(req.files.perfil){
      var imagenRuta = req.files.perfil.path;
      var imagenSplit = imagenRuta.split("\\");
      usuarios.foto.nombre=imagenSplit[2];
      }
      else{
          usuarios.foto.nombre="fb2.jpg";
      }
      //pasa los datos recibidos en el objeto producto
    //pasa los datos recividos al objeto usuarios
    usuarios.nombre = params.nombre;
    usuarios.apellidos = params.apellidos;
    usuarios.usuario = params.usuario;
    usuarios.telefono = params.telefono;
    usuarios.direccion = params.direccion;
    usuarios.correo = params.correo;
    usuarios.sexo = params.sexo;
    usuarios.rol=params.rol;
    usuarios.foto.contentType="image/jpg"
  
    //verifica que el usuario tenga el password
    if (params.password) {
        //encripta el pasword del usuario
        bcript.hash(req.body.password, null, null, function(error, hash) {
            usuarios.password = hash;
            if (usuarios.usuario != null) {
                //guarda al nuevo usuario en la bd
                usuarios.save((error, usuario) => {
                    if (error) {
                        
                        res.status(500).send({ mensaje: "error al guradar" })
                    } else {
                        res.status(200).send(usuario)
                    }
                })
            }

        });
    }
}
//metod para borrar un usuario
function DeleteUser(req, res) {
    var id = req.params.id;
    //busca y borra al usuario por id
    Usuarios.findByIdAndRemove(id, (error, borrado) => {
        if (error) {
            res.status(500).send({ mensaje: "error al borrar usuario" });
        } else {
            if (!borrado) {
                res.status(404).send({ mensaje: "No se pudo borrar usuario" });
            } else {
                  //borra la imgen del servidor
                  if(borrado.foto.nombre!="fb2.jpg")
                  {
                  var ruta="./resources/profile/"+borrado.foto.nombre;
                  fs.unlink(ruta, function(err) {
                      if (err) {
                          return console.error("error al borrar la imagen");
                      }else{
                          res.status(200).send( borrado );
                      }
                     
                   });
                }
                else{
                    res.status(200).send( borrado );   
                }
            }
        }
    })
}


//metodo para enviar imagen al cleinte
function Imagen(req, res){

    var imagen=req.params.imagen;
    var ruta="./resources/profile/"+imagen;
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
//metodo para obtener un usuario en especifico
function Buscar(req,res)
{
    var id = req.params.id;
    console.log(id);
    //busca el la bd por la id del usuario
    Usuarios.findById(id, (error, result) => {
        if (error) {
            res.status(500).send({ mensaje: "error al buscar" });
        } else {
            if (!result) {
                res.status(404).send({ mensaje: "sin resultado" });
            } else {
                //agrega un rol al usuario
                Roles.populate(result, {path: "rol"},function(err, usuario){
                    res.status(200).send(usuario)
                }); 
            }
        }
    })
}

//metodo pra crear un rol
function createRol(req, res) {
    var roles = new Roles();
    var params = req.body;
    roles.rol = params.rol;
     //verifica si el rol no esta vacio
    if (params.rol) {
            if (roles.rol != null) {
                //guarda el el rol en la bd
                roles.save((error, rol) => {
                    if (error) {
                        res.status(500).send({ mensjae: "error al guradar" })
                    } else {
                        res.status(200).send(rol)
                    }
                })
            }

    }

}

function FiltarUsuarioNombre(req,res){
var Termino=req.body.termino
    //busca el la bd por la id del usuario

    Usuarios.find({nombre: new RegExp(Termino, 'i')}, (error, result) => {
        if (error) {
            res.status(500).send({ mensaje: "error al buscar" });
        } else {
            if (!result) {
                res.status(404).send({ mensaje: "sin resultado" });
            } else {
                //agrega un rol al usuario
                Roles.populate(result, {path: "rol"},function(err, usuario){
                    res.status(200).send(usuario)
                }); 
            }
        }
    })
}

function FiltarUsuarioApellido(req,res){
    var Termino=req.body.termino
        //busca el la bd por la id del usuario
    
        Usuarios.find({apellidos: new RegExp(Termino, 'i')}, (error, result) => {
            if (error) {
                res.status(500).send({ mensaje: "error al buscar" });
            } else {
                if (!result) {
                    res.status(404).send({ mensaje: "sin resultado" });
                } else {
                    //agrega un rol al usuario
                    Roles.populate(result, {path: "rol"},function(err, usuario){
                        res.status(200).send(usuario)
                    }); 
                }
            }
        })
    }

    function FiltarUsuarioEmail(req,res){
        var Termino=req.body.termino
            //busca el la bd por la id del usuario
        
            Usuarios.find({correo: new RegExp(Termino, 'i')}, (error, result) => {
                if (error) {
                    res.status(500).send({ mensaje: "error al buscar" });
                } else {
                    if (!result) {
                        res.status(404).send({ mensaje: "sin resultado" });
                    } else {
                        //agrega un rol al usuario
                        Roles.populate(result, {path: "rol"},function(err, usuario){
                            res.status(200).send(usuario)
                        }); 
                    }
                }
            })
        }
    

function Login(req,res){
   
        var params = req.body;
        var usuario = params.usuario;
        var pass = params.password;
       
        Usuarios.findOne({ usuario: usuario }, (error, user) => {
            if (error) {
                res.status(500).send({ mensaje: "Error al ingresar usuario" })
            } else {
               
                if (user==null) {
                    //alert("Usuario o Contraseña incorrecta");
                    res.status(404).send({ mensaje: "usuario no existe " })
                } else {
                    // res.status(200).send({ user });
                    bcript.compare(pass, user.password, function(error, ok) {
                        if (ok) {
                            Roles.populate(user, {path: "rol"},function(err, usuario){
                                res.status(200).send(usuario)
                            }); 
                        }
                        else{
                            res.status(404).send({ mensaje: "usuario o contraseña incorrectas " })
                        }
                    });
                }
            }
        });
    }
    


function DeleteRol(){
    var id = req.params.id;
    //busca y borra al usuario por id
    Roles.findByIdAndRemove(id, (error, borrado) => {
        if (error) {
            res.status(500).send({ mensaje: "error al borrar rol" });
        } else {
            if (!borrado) {
                res.status(404).send({ mensaje: "No se pudo borrar rol" });
            } else {
                          res.status(200).send( borrado );
            }
        }
    })
}

//exporta los metodos usados en otras partes
module.exports = {GetUsuarios,createRol,create,updated, DeleteUser,Buscar,Imagen,DeleteRol,Login,GetRoles,FiltarUsuarioNombre,FiltarUsuarioApellido,FiltarUsuarioEmail }
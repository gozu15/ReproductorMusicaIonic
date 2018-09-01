"use strict"

const request = require('request');
const cheerio=require('cheerio')
const trycatch=require('trycatch');


function getMusic(req, res) {

    var url = "https://mp3teca.com/albums/";
   request(url,function(error,response,html){
       if(!error){
           var $=cheerio.load(html);
           $('#archive').filter(function(){
               var Album=[];
               var data =$(this);
               var albunes=data.children().children().children().toArray();
               albunes.forEach(element => {
                //ALBUM console.log(element.attribs.href);

                //IMAGENES console.log(element.children[0].attribs.src);
                // ARTISTAS console.log(element.children[2].children[0].data)
                //NOMBRE ALBUM console.log(element.children[4].children[0].data)
                trycatch(function(){
                    //FECHA LANZAMIENTOconsole.log(element.children[9].children[0].data)
                    Album.push({
                        urlAlbum:element.attribs.href,
                        urlImagen:element.children[0].attribs.src,
                        nombreArtista: element.children[2].children[0].data,
                        nombreAlbum:element.children[4].children[0].data,
                        fechaLanzamiento:element.children[9].children[0].data
                    });
                   // console.log(Album);
                },function(error){
                
                })
                
               });
              res.status(200).send(Album);
               
           })
       }
   })

  

}

function getCanciones(req,res){
    var url= req.body.url;
    request(url,function(error,response,html){
        if(!error){
            var $=cheerio.load(html);
            $('#album-mp3s').filter(function(){
                var Canciones=[];
                var data =$(this);
                var canciones=data.children().toArray();
                canciones.forEach(element => {
                 //NOMBRE CANCION console.log(element.children[1].data);

 
                 //MUSICAS console.log(element.children[2].attribs.href);
                
                 trycatch(function(){
                     //FECHA LANZAMIENTOconsole.log(element.children[9].children[0].data)
                     Canciones.push({
                        nombreCancion:element.children[1].data,
                        urlcancion:element.children[2].attribs.href
                     });
                     //console.log(Canciones);
                 },function(error){
                 
                 })
                 
                });
               res.status(200).send(Canciones);
                
            })
        }
    }) 
}

function descargarMusicas(req,res){
    var url= req.body.url;
   console.log(req.body);
    request(url,function(error,response,html){
        if(!error){
            var $=cheerio.load(html);
            $('#audio').filter(function(){
                var Canciones=[];
                var data =$(this);
                var canciones=data.children().toArray();
               
                  console.log(canciones[0].children[3].attribs);

                 
                
               res.status(200).send({
                    musicamp4:canciones[0].children[1].attribs.src,
                    musicamp3:canciones[0].children[3].attribs.src,
                    reproduciendo:0,
                   
                });
                    
                
            })
        }
    }) 
}
module.exports = { getMusic,getCanciones,descargarMusicas}
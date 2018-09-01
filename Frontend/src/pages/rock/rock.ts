import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import{CANTANTES} from '../../assets/data/datacantantes';
import {Cantante} from '../../assets/interface/autor.interface';
import {DISCOS} from '../../assets/data/dtDiscos';
import { Discos } from '../../assets/interface/disco.interface';
import { Musicas } from '../../assets/interface/musica.interface';
import { AlbunesProvider } from '../../providers/albunes/albunes';


/**
 * Generated class for the RockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rock',
  templateUrl: 'rock.html',
})
export class RockPage {

  discos: Discos[]=[];


  cantantes:Cantante[]=[];
  
  cantante:Cantante;
  canciones:Musicas[]=[];
  cancion:Musicas;

  url:any;
  CancionesAlbum:any;

  musica:any;
  audio:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public provider:AlbunesProvider) {
    this.cantantes = CANTANTES.slice(0);
      this.discos = DISCOS.slice(0);
    this.url= navParams.get("url");
    this.obtenerMusicas(this.url);
    this.audio=new Audio;
 
      
  }

  obtenerMusicas(urln){
    var data={url:urln}
    this.provider.getCanciones(data).subscribe((result:any)=>{
      this.CancionesAlbum=result.slice(0);
      console.log(this.CancionesAlbum);
    }) 
  }

  reproducirCancion(urln){
    var data={url:urln}
    this.provider.getSound(data).subscribe((result:any)=>{
      this.musica=result.musicamp3;
           console.log(result);      
      
      this.audio.src=result.musicamp4;
      this.audio.play();
      /*var a = new Audio(result.musicamp4);
      a.play();    */  
      
    }) 
  }

  descargarMusica(urln){
    var data={url:urln}
    this.provider.getSound(data).subscribe((result:any)=>{
           console.log(result.musicamp4);
      
     /* this.audio = new Audio;
      this.audio.src=result.musica;*/
      var a = new Audio(result.musicamp3);
      a.play();      
    }) 
  }


  retornarDisco(){
    this.canciones= this.discos[0].canciones.slice(0);
    return this.canciones;
  }

  play(canciones: Musicas) {
    console.log(canciones);
    if (this.cancion != undefined) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.cancion.reproduciendo = false;
      this.audio = undefined;

    }
    
    this.cancion = undefined;
    this.audio = new Audio();
    this.cancion = canciones;
    this.audio.src = canciones.audio;
    this.audio.load();
    this.audio.play();
    this.cancion.reproduciendo = true;
    this.audio.onended = () => this.cancion.reproduciendo = false;
    //console.log("nuevo");
    //setTimeout(()=>this.animal.reproduciendo=false,animal.duracion*1000);
  }

  pause() {
    this.audio.pause();
    this.cancion.reproduciendo = false;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RockPage');
  }

}

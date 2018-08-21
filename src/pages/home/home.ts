import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ViewChild} from '@angular/core';
import{Slides} from 'ionic-angular';
import{CANTANTES} from '../../assets/data/datacantantes';
import {Cantante} from '../../assets/interface/autor.interface';
import {DISCOS} from '../../assets/data/dtDiscos';
import { Discos } from '../../assets/interface/disco.interface';
import { Musicas } from '../../assets/interface/musica.interface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
@ViewChild(Slides) slides:Slides;

  searchQuery: string = '';
  items: string[];
  valor;

  discos: Discos[]=[];


  cantantes:Cantante[]=[];
  audio:any;
  cantante:Cantante;
  canciones:Musicas[]=[];
  cancion:Musicas;

  constructor(public navCtrl: NavController) {
    this.initializeItems();
    this.pasarSiguienteSlider();
    this.valor="";
    //this.cantantes=[];
    console.log(CANTANTES);
    console.log(this.cantantes);
    
      this.cantantes = CANTANTES.slice(0);
      this.discos = DISCOS.slice(0);
      console.log(this.discos);
    
   
    
    //console.log(CANTANTES);
   
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

  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota',
      'any'
    ];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;
    this.valor = val;

    
    console.log(val.length)

    // if the value is an empty string don't filter the items
    if ( val!=undefined || val != null || val==" ") {
      console.log("entro");
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  pasarSiguienteSlider(){
    setInterval(()=>{
      if(this.slides.isEnd()){
        this.slides.slideTo(0);
        console.log("ultimo")
      }
      else
      {
        this.slides.slideNext();
      }
    },3000);
    //this.slides.slideNext();
  }

  

}

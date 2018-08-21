import { Musicas } from "./musica.interface";

export interface Discos{
    nombreDisco:string,
    nombreGrupo:string,
    genero:string,
    bibliografia:string,
    imagen:string,
    canciones:Musicas[]
}
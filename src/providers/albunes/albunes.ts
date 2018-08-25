import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs/Observable';

/*
  Generated class for the AlbunesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class AlbunesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AlbunesProvider Provider');
  }

  getAlbums():Observable<any[]>{
    return this.http.get<any[]>("http://192.168.10.247:2321/api/musicas");
  }

  getCanciones(url):Observable<any[]>{
    return this.http.post<any[]>("http://192.168.10.247:2321/api/musicas",url,httpOptions)
  }

  getSound(url):Observable<any[]>{
    return this.http.post<any[]>("http://192.168.10.247:2321/api/musicas/download",url,httpOptions)
  }
}

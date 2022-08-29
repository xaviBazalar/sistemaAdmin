import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolitudesUsuarioService {

  url:string=environment.baseUrl;

  constructor(private http:HttpClient) { }

  getSolicitudesUsuario(id:string|null){
    return this.http.get(`${this.url}/solicitudesUsuario?gst=${id}`)
  }

  /*getSolicitud(id:string|null){
    return this.http.get(`${this.url}/solicitudes?id=${id}`)
  }

  addSolicitud(body:any){
    return this.http.post(`${this.url}/solicitudes`,body)
  }*/
  

}

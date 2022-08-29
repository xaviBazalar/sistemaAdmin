import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  url:string=environment.baseUrl;

  constructor(private http:HttpClient) { }

  getNotificaciones(){
    return this.http.get(`${this.url}/notificacionesUsuario`)
  }

  getNotificacionesUsuario(usuario:string|null){
    return this.http.get(`${this.url}/notificacionesUsuario?usuario=${usuario}`)
  }

  updateNotificacionesUsuario(id:string|null,data:any){
    return this.http.put(`${this.url}/notificacionesUsuario/${id}`,data)
  }

  addNotificacionesUsuario(body:any){
    return this.http.post(`${this.url}/notificacionesUsuario`,body)
  }
  
}

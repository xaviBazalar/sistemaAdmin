import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestionSolicitudService {
  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getGestionesSolicitud(){
    return this.http.get(`${this.url}/gestionSolicitud`)
  }

  getGestionSolicitud(solicitud:string|null){
    return this.http.get(`${this.url}/gestionSolicitud?solicitud=${solicitud}`)
  }

  updateGestionSolicitud(id:string|null,data:any){
    return this.http.put(`${this.url}/gestionSolicitud/${id}`,data)
  }

  addGestionSolicitud(body:any){
    return this.http.post(`${this.url}/gestionSolicitud`,body)
  }
  
}

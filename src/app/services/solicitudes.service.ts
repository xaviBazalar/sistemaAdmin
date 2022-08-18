import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  url:string=environment.baseUrl;

  constructor(private http:HttpClient) { }

  getSolicitudes(){
    return this.http.get(`${this.url}/solicitudes`)
  }

  getSolicitud(id:string|null){
    return this.http.get(`${this.url}/solicitudes?id=${id}`)
  }

  addSolicitud(body:any){
    return this.http.post(`${this.url}/solicitudes`,body)
  }
  



 
}

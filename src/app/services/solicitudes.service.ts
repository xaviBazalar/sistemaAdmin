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

  getSolicitudesFilter(dataSend:any){
   // var queryString = Object.keys(dataSend).map(key => key + '=' + dataSend[key]).join('&');

    return this.http.get(`${this.url}/solicitudes`,{params: dataSend})
  }

  getSolicitud(id:string|null){
    return this.http.get(`${this.url}/solicitudes?id=${id}`)
  }

  updateSolicitud(id:string|null,data:any){
    return this.http.put(`${this.url}/solicitudes/${id}`,data)
  }

  addSolicitud(body:any){
    return this.http.post(`${this.url}/solicitudes`,body)
  }
  



 
}

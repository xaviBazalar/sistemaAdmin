import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  url:string=environment.baseUrl;

  constructor(private http:HttpClient) { }

  getSolicitudes(page:string|number,options:string|number){
    return this.http.get(`${this.url}/solicitudes?page=${page}&options=${options}`)
  }

  getSolicitudesFilter(dataSend:any){
   // var queryString = Object.keys(dataSend).map(key => key + '=' + dataSend[key]).join('&');

    return this.http.get(`${this.url}/solicitudes`,{params: dataSend})
  }

  getSolicitud(id:string|null){
    return this.http.get(`${this.url}/solicitudes?page=1&options=0&id=${id}`)
  }

  updateSolicitud(id:string|null,data:any){
    return this.http.put(`${this.url}/solicitudes/${id}`,data)
  }

  addSolicitud(body:any){
    return this.http.post(`${this.url}/solicitudes`,body)
  }
  
  deleteSolicitud(params: any){
    return this.http.delete(`${ this.url }/solicitudes`,{body: params} )
  }
 
}

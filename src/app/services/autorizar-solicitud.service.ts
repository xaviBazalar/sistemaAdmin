import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutorizarSolicitudService {

  url:string=environment.baseUrl;

  constructor(private http:HttpClient) { }

  validatePinAutorizacion(data:string|null){
    return this.http.get(`${this.url}/auth-request?${data}`)
  }

  updateAutorizacionSolicitud(data:any){
    return this.http.put(`${this.url}/auth-request`,data)
  }
  //auth-request
}

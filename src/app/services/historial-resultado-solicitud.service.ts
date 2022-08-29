import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistorialResultadoSolicitudService {

  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getHistorialResultadoSolicitud(idsolicitud:string|null){
    return this.http.get(`${this.url}/historialResultadoSolicitud?id=${idsolicitud}`) 
  }

  addHistorialResultadoSolicitud(infoResultado:any){
    return this.http.post(`${this.url}/historialResultadoSolicitud`,infoResultado)
  }

  updateHistorialResultadoSolicitud(dataHistorial:any,id:string){
    return this.http.put(`${this.url}/historialResultadoSolicitud/${id}`,dataHistorial)
  }
}
//historialResultadoSolicitud
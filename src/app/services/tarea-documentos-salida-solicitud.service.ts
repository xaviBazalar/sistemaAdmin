import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareaDocumentosSalidaSolicitudService {

  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getTareaDocumentosSalidaSolicitud(randomId:string|null){
    return this.http.get(`${this.url}/tareaDocumentosSalidaSolicitud?randomId=${randomId}`) 
  }

  addTareaDocumentosSalidaSolicitud(data:any){
    return this.http.post(`${this.url}/tareaDocumentosSalidaSolicitud`,data)
  }

  updateTareaDocumentosSalidaSolicitud(data:any,id:string){
    return this.http.put(`${this.url}/tareaDocumentosSalidaSolicitud/${id}`,data)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareaDocumentosEntradaSolicitudService {

  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getTareaDocumentosEntradaSolicitud(randomId:string|number|null){
    return this.http.get(`${this.url}/tareaDocumentosEntradaSolicitud?randomId=${randomId}`) 
  }

  addTareaDocumentosEntradaSolicitud(data:any){
    return this.http.post(`${this.url}/tareaDocumentosEntradaSolicitud`,data)
  }

  updateTareaDocumentosEntradaSolicitud(data:any,id:string){
    return this.http.put(`${this.url}/tareaDocumentosEntradaSolicitud/${id}`,data)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareaDocumentosSalidaService {

  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getTareaDocumentosSalida(tarea:string|null){
    return this.http.get(`${this.url}/tareaDocumentosSalida?tarea=${tarea}`) 
  }

  addTareaDocumentosSalida(data:any){
    return this.http.post(`${this.url}/tareaDocumentosSalida`,data)
  }

  updateTareaDocumentosSalida(data:any,id:string){
    return this.http.put(`${this.url}/tareaDocumentosSalida/${id}`,data)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareaDocumentosEntradaService {

  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getTareaDocumentosEntrada(tarea:string|null){
    return this.http.get(`${this.url}/tareaDocumentosEntrada?tarea=${tarea}`) 
  }

  addTareaDocumentosEntrada(data:any){
    return this.http.post(`${this.url}/tareaDocumentosEntrada`,data)
  }

  updateTareaDocumentosEntrada(data:any,id:string){
    return this.http.put(`${this.url}/tareaDocumentosEntrada/${id}`,data)
  }
}
//http://localhost:8080/api/tareaDocumentosEntrada?tarea=62fad69c48d35ca4acd14687
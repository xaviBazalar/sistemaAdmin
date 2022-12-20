import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareaDocumentosEntradaService {

  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getTareaDocumentosEntrada(tarea:string|null,contrato:string|null,page:string|number,options:string|number){
    return this.http.get(`${this.url}/tareaDocumentosEntrada?tarea=${tarea}&contrato=${contrato}&page=${page}&options=${options}`) 
  }

  getTareaDocumentosEntradaFilter(tarea:string|null,contrato:string,dataFilter:string){
    return this.http.get(`${this.url}/tareaDocumentosEntrada?tarea=${tarea}&contrato=${contrato}&page=1&options=1&${dataFilter}`) 
  }

  addTareaDocumentosEntrada(data:any){
    return this.http.post(`${this.url}/tareaDocumentosEntrada`,data)
  }

  updateTareaDocumentosEntrada(data:any){
    return this.http.put(`${this.url}/tareaDocumentosEntrada/`,data)
  }

  deleteTareaDocumentosEntrada(params: any){
    return this.http.delete(`${ this.url }/tareaDocumentosEntrada`,{body: params} )
  }
}
//http://localhost:8080/api/tareaDocumentosEntrada?tarea=62fad69c48d35ca4acd14687
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareaDocumentosSalidaService {

  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getTareaDocumentosSalida(tarea:string|null,contrato:string|null,page:string|number,options:string|number){
    return this.http.get(`${this.url}/tareaDocumentosSalida?tarea=${tarea}&contrato=${contrato}&page=${page}&options=${options}`) 
  }

  getTareaDocumentosSalidaFilter(tarea:string|null,contrato:string,dataFilter:string){
    return this.http.get(`${this.url}/tareaDocumentosSalida?tarea=${tarea}&contrato=${contrato}&page=1&options=1&${dataFilter}`) 
  }

  addTareaDocumentosSalida(data:any){
    return this.http.post(`${this.url}/tareaDocumentosSalida`,data)
  }

  updateTareaDocumentosSalida(data:any){
    return this.http.put(`${this.url}/tareaDocumentosSalida`,data)
  }

  deleteTareaDocumentosSalida(params: any){
    return this.http.delete(`${ this.url }/tareaDocumentosSalida`,{body: params} )
  }
}

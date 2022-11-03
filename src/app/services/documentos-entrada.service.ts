import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentosEntradaService {

  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getDocumentosEntrada(page:string|number,options:string|number){
    return this.http.get(`${this.url}/documentosEntrada?page=${page}&options=${options}`) 
  }

  getDocumentosEntradaFilter(page:string|number,options:string|number,dataFilter:string){
    return this.http.get(`${this.url}/documentosEntrada?page=${page}&options=${options}&${dataFilter}`) 
  }

  addDocumentoEntrada(data:any){
    return this.http.post(`${this.url}/documentosEntrada`,data)
  }

  updateDocumentoEntrada(data:any){
    return this.http.put(`${this.url}/documentosEntrada`,data)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentosEntradaService {

  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getDocumentosEntrada(){
    return this.http.get(`${this.url}/documentosEntrada`) 
  }

  addDocumentoEntrada(data:any){
    return this.http.post(`${this.url}/documentosEntrada`,data)
  }

  updateDocumentoEntrada(data:any){
    return this.http.put(`${this.url}/documentosEntrada`,data)
  }
}

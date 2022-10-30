import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentosSalidaService {
  
  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getDocumentosSalida(page:string|number,options:string|number){
    return this.http.get(`${this.url}/documentosSalida?page=${page}&options=${options}`) 
  }

  addDocumentoSalida(data:any){
    return this.http.post(`${this.url}/documentosSalida`,data)
  }

  updateDocumentoSalida(data:any){
    return this.http.put(`${this.url}/documentosSalida`,data)
  }
}

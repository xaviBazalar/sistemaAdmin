import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentosSalidaService {
  
  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getDocumentosSalida(){
    return this.http.get(`${this.url}/documentosSalida`) 
  }

  addDocumentoSalida(data:any){
    return this.http.post(`${this.url}/documentosSalida`,data)
  }
}

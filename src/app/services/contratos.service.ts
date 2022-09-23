import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContratosService {

  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getContratos(){
    return this.http.get(`${this.url}/contratos`) 
  }

  addContrato(data:any){
    return this.http.post(`${this.url}/contratos`,data)
  }

  updateContrato(data:any){
    return this.http.put(`${this.url}/contratos`,data)
  }
}

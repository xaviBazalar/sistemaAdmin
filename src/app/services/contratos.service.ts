import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContratosService {

  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getContratos(page:any=1,extraParams:any){
    return this.http.get(`${this.url}/contratos?page=${page}&${extraParams}`) 
  }

  getContratosActivos(){
    return this.http.get(`${this.url}/contratos?estado=true`) 
  }

  addContrato(data:any){
    return this.http.post(`${this.url}/contratos`,data)
  }

  updateContrato(data:any){
    return this.http.put(`${this.url}/contratos`,data)
  }

  deleteContrato(params: any){
    return this.http.delete(`${ this.url }/contratos`,{body: params} )
  }
}

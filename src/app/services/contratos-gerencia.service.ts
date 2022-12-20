import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContratosGerenciaService {

  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getContratosGerencia(page:any,gerencia:string,extraParams:any){
    return this.http.get(`${this.url}/contratosGerencia?page=${page}&gerencia=${gerencia}&${extraParams}`) 
  }

  getContratosGerenciaActivos(gerencia:string,options:any=1){
    return this.http.get(`${this.url}/contratosGerencia?gerencia=${gerencia}&estado=true&options=${options}`) 
  }

  addContratoGerencia(data:any){
    return this.http.post(`${this.url}/contratosGerencia`,data)
  }

  updateContratoGerencia(data:any){
    return this.http.put(`${this.url}/contratosGerencia`,data)
  }

  deleteContratoGerencia(params: any){
    return this.http.delete(`${ this.url }/contratosGerencia`,{body: params} )
  }
}

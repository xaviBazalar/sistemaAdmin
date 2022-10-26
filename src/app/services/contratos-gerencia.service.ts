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

  getContratosGerenciaActivos(gerencia:string){
    return this.http.get(`${this.url}/contratosGerencia?gerencia=${gerencia}&estado=true`) 
  }

  addContratoGerencia(data:any){
    return this.http.post(`${this.url}/contratosGerencia`,data)
  }

  updateContratoGerencia(data:any){
    return this.http.put(`${this.url}/contratosGerencia`,data)
  }
}

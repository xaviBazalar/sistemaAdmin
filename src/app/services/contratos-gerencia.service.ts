import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContratosGerenciaService {

  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getContratosGerencia(gerencia:string){
    return this.http.get(`${this.url}/contratosGerencia?gerencia=${gerencia}`) 
  }

  addContratoGerencia(data:any){
    return this.http.post(`${this.url}/contratosGerencia`,data)
  }
}

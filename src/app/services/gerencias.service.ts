import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GerenciasService {
  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getGerencias(){
    return this.http.get(`${this.url}/gerencia`) 
  }

  getGerenciasActivas(){
    return this.http.get(`${this.url}/gerencia?estado=true`) 
  }

  addGerencia(data:any){
    return this.http.post(`${this.url}/gerencia`,data)
  }

  updateGerencia(data:any){
    return this.http.put(`${this.url}/gerencia`,data)
  }
  
}

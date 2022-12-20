import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GerenciasService {
  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getGerencias(page:string|number,options:string|number){
    return this.http.get(`${this.url}/gerencia?page=${page}&options=${options}`) 
  }

  getGerenciasFilter(page:string|number,options:string|number,dataFilter:string){
    return this.http.get(`${this.url}/gerencia?page=${page}&options=${options}&${dataFilter}`) 
  }

  getGerenciasActivas(){
    return this.http.get(`${this.url}/gerencia?estado=true&options=0`) 
  }

  addGerencia(data:any){
    return this.http.post(`${this.url}/gerencia`,data)
  }

  updateGerencia(data:any){
    return this.http.put(`${this.url}/gerencia`,data)
  }

  deleteGerencia(params: any){
    return this.http.delete(`${ this.url }/gerencia`,{body: params} )
  }
  
}

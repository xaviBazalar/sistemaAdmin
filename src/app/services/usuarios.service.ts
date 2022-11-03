import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url:string=environment.baseUrl;

  constructor(private http:HttpClient) { }

  getUsuarios(page:string|number=1,options:string|number=0){
    return this.http.get(`${this.url}/usuarios?page=${page}&options=${options}`)
  }

  getUsuariosFilter(page:string|number=1,options:string|number=0,dataFilter:string){
    return this.http.get(`${this.url}/usuarios?page=${page}&options=${options}&${dataFilter}`)
  }
  
  addUsuario(data:any){
    return this.http.post(`${this.url}/usuarios`,data)
  }

  updateUsuario(data:any){
    return this.http.put(`${this.url}/usuarios`,data)
  }

}

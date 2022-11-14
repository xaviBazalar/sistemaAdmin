import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecoveryUsuarioService {
  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getRecoveryUsuario(id:string|null=""){
    return this.http.get(`${this.url}/recovery?hash_id=${id}`) 
  }

  updateRecoveryUsuario(id:string|null,data:any){
    return this.http.put(`${this.url}/recovery/${id}`,data)
  }
}

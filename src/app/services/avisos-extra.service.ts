import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvisosExtraService {
  url:string=environment.baseUrl;

  constructor(private http:HttpClient) { }

  addAvisoExtra(data:any){
    return this.http.post(`${this.url}/aviso-extra`,data)
  }

  updateAvisoExtra(data:any){
    return this.http.put(`${this.url}/aviso-extra`,data)
  }

  getAvisosExtra(dataExtra:string){
    return this.http.get(`${this.url}/aviso-extra?${dataExtra}`)
  }
}

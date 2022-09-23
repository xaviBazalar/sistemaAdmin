import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareasContratoService {

  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getTareasContrato(idcontrato:string){
    return this.http.get(`${this.url}/tareasContrato?contrato=${idcontrato}`) 
  }

  addTareaContrato(data:any){
    return this.http.post(`${this.url}/tareasContrato`,data)
  }

  updateTareaContrato(data:any){
    return this.http.put(`${this.url}/tareasContrato`,data)
  }
}

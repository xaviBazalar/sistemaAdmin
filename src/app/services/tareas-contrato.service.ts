import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareasContratoService {

  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getTareasContrato(pagina:string|number,idcontrato:string){
    return this.http.get(`${this.url}/tareasContrato?page=${pagina}&contrato=${idcontrato}`) 
  }

  addTareaContrato(data:any){
    return this.http.post(`${this.url}/tareasContrato`,data)
  }

  updateTareaContrato(data:any){
    return this.http.put(`${this.url}/tareasContrato`,data)
  }

  getTareasContratoFilter(dataSend:any){
    // var queryString = Object.keys(dataSend).map(key => key + '=' + dataSend[key]).join('&');
 
     return this.http.get(`${this.url}/tareasContrato?page=1`,{params: dataSend})
   }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentacionSolicitudedService {

  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getDocumentacionSolicitud(tarea:string|null,contrato:string|null,page:any=1,extraParams:any){
    return this.http.get(`${this.url}/documentacionSolicitudes?tarea=${tarea}&contrato=${contrato}&page=${page}&${extraParams}`) 
  }

  addDocumentacionSolicitud(data:any){
    return this.http.post(`${this.url}/documentacionSolicitudes`,data)
  }

  updateDocumentacionSolicitud(data:any){
    return this.http.put(`${this.url}/documentacionSolicitudes`,data)
  }

  deleteDocumentacionSolicitud(params: any){
    return this.http.delete(`${ this.url }/documentacionSolicitudes`,{body: params} )
  }

}

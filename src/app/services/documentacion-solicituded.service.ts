import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentacionSolicitudedService {

  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getDocumentacionSolicitud(tarea:string|null){
    return this.http.get(`${this.url}/documentacionSolicitudes?tarea=${tarea}`) 
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BitacoraSolicitudService {

  url:string=environment.baseUrl;

  constructor(private http:HttpClient) { }

  getBitacoraSolicitud(solicitud:string|null){
    return this.http.get(`${this.url}/bitacoraSolicitud?solicitud=${solicitud}`)
  }
}

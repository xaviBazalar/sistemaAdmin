import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadoResultadoService {

  url:string=environment.baseUrl;

  constructor(private http:HttpClient) { }

  getSolicitudes(){
    return this.http.get(`${this.url}/estadoResultado`)
  }
}

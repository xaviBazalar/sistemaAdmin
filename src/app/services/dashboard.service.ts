import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getCargaDeTrabajoMasVencidos(dataExtra:string=""){
    return this.http.get(`${this.url}/dashboard?reporte=carga-de-trabajo&${dataExtra}`) 
  }
  //http://localhost:8080/api/dashboard
}

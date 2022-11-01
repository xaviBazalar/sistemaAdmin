import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  generateExcel(body:any={}){
    return this.http.post(`${this.url}/reporteExcel`,body)
  }
}

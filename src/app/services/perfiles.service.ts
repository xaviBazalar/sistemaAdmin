import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getPerfiles(){
    return this.http.get(`${this.url}/perfiles`) 
  }
}

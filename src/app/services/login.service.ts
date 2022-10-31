import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string=environment.baseUrl;

  constructor(private http:HttpClient) { }

  validate(body:any){
    return this.http.post(`${this.url}/login`,body)
  }

  recoveryAccount(email:string){
    return this.http.get(`${this.url}/login?emailS=${email}`)
  }
}

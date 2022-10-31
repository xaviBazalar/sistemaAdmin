import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiMailerInticoService {
  urlApiEmail:string=environment.baseUrlApiEmail;

  constructor(private http:HttpClient) { }

  sendEmail(body:any){
    let headers = new HttpHeaders(
      { 
        "apikey": environment.apiKey,
        "user": environment.userApiEmail
      }
    );
    return this.http.post(`${this.urlApiEmail}`,body,{headers:headers})
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  addFileToApp(data:any){
    return this.http.post(`${this.url}/upload`,data)
  }
}
//upload
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadGoogleStorageService {

  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  addFileToStorage(data:any){//upload Storage Google
    return this.http.post(`${this.url}/uploadStorage`,data)
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  url:string=environment.baseUrl;

  constructor(private http:HttpClient) { }

  getTareas(page:any=1,extraParams:any){
    return this.http.get(`${this.url}/tareas?page=${page}&${extraParams}`)
  }

  addTarea(data:any){
    return this.http.post(`${this.url}/tareas`,data)
  }

  updateTarea(data:any){
    return this.http.put(`${this.url}/tareas`,data)
  }
  
}

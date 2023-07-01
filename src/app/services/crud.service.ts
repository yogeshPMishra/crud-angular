import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor(private http:HttpClient) {
  }
  url = "https://angular-crud-app.cyclic.app/api/v1";
  gets = ()=>{
    return this.http.get(`${this.url}/read`);
  }

  getone = (id:number)=>{
      return this.http.get(`${this.url}/read/${id}`);
  }

  create = (data:any)=>{
      return this.http.post(`${this.url}/create`,data);
  }

  update = (id:number,data:any)=>{
    return this.http.put(`${this.url}/update/${id}`,data);
  }

  delete = (id:number)=>{
    return this.http.delete(`${this.url}/delete/${id}`);
  }
}

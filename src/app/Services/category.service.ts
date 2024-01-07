import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl="http://localhost:8080/category";

  constructor(private httpClient:HttpClient) { }
     
  public categories(){
    return this.httpClient.get(`${this.baseUrl}/`);
  }

  public addCategory(category:any){
       return this.httpClient.post(`${this.baseUrl}/`,category);
  }
}

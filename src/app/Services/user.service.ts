import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../entities/User';
import { Observable } from 'rxjs';
import { Feedback } from '../entities/feedback';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
   baseUrl ="http://localhost:8080/";

  constructor(private httpClient:HttpClient) { }

 
  addUser(user:User):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}user/`,user);
  }
  
  update(user: User) {
     return this.httpClient.put(`${this.baseUrl}user/`,user);
  }

  getAllUsers(){
    return this.httpClient.get(`${this.baseUrl}user/`);
  }
  getAllUserPage(pageNo:any,pageSize:any){
    return this.httpClient.get(`${this.baseUrl}user/${pageNo}/${pageSize}`);
  }


  submitFeedback(feedback:Feedback,uId:any){
    return this.httpClient.post(`${this.baseUrl}user/feedback/${uId}`,feedback);
  }

  getFeedbackByPage(pageNo:any,pageSize:any){
        return this.httpClient.get(`${this.baseUrl}user/feedback/${pageNo}/${pageSize}`);
  }
}

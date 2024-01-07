import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { User } from '../entities/User';
import { LowerCasePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

baseUrl="http://localhost:8080/";

  constructor(private http:HttpClient) { }

// getCurrent user : logged in user
public getCurrentUser(){
  return this.http.get(`${this.baseUrl}current-user`);
}



  //generate token
  public generateToken(loginData:any){
    return this.http.post(`${this.baseUrl}generate-token`,loginData);
  }
   
  //login user : set token in local storage
  public loginUser(token:any){
    localStorage.setItem("token",token);
    return true;
  }
  
  //isLogin 
  public isLoggedIn():boolean{
    let tokenStr = localStorage.getItem("token");
    if(tokenStr==undefined || tokenStr=="" || tokenStr==null){
      return false;
    }
    return true;
  }

// logout
public logOut():boolean{
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return true;
 }

 //getToken 
 public getToken(){
  return localStorage.getItem("token");
 }
 
 // set userDetail

 public setUser(user:User){
  localStorage.setItem("user",JSON.stringify(user));
 }

//get User
public getUser(){
  let userStr = localStorage.getItem("user");
  if(userStr!=null){
    return JSON.parse(userStr);
  }
  else{
    this.logOut();
    return null;
  }
}


public getUserRole(){
  let user = this.getUser();
  return user.authorities[0].authority;
}

}

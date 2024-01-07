import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultServiceService {
  baseUrl="http://localhost:8080/result";
  constructor(private http:HttpClient) { }
  getResultByUser(uId:any){
    return this.http.get(`${this.baseUrl}/user/${uId}`);
  }

  getUserFromResult(qid:any){
  return this.http.get(`${this.baseUrl}/user/us/${qid}`)
}

getRanks(){
  return this.http.get(`${this.baseUrl}/ranks`);
}

deleteResult(id:any){
  return this.http.delete(`${this.baseUrl}/${id}`);
}
getRanksByQuiz(qid:any){
  return this.http.get(`${this.baseUrl}/ranks/${qid}`);
}

}

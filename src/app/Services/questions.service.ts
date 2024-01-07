import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Questions } from '../entities/questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  baseUrl="http://localhost:8080/questions/";
  constructor(private http:HttpClient) { }

  getQuestion(qid:any){
      return this.http.get(`${this.baseUrl}quiz/all/${qid}`);
  }

  getQuestionofQuizForTest(qid:any){
    return this.http.get(`${this.baseUrl}quiz/${qid}`);
}


   public addQuestion(question:Questions){
    return this.http.post(`${this.baseUrl}`,question);
   }

   public getQuestionById(quesId:any){
return this.http.get(`${this.baseUrl}${quesId}`);
   }
    
   public updateQuestion(question:Questions){
    return this.http.put(`${this.baseUrl}`,question);
   }

   public deleteQuestion(quesId:any){
    return this.http.delete(`${this.baseUrl}${quesId}`)
   }

   public getResult(questions:any[],uId:any){
   return this.http.post(`${this.baseUrl}result/${uId}`,questions);
   }
}

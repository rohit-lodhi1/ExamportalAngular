import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quizes } from '../entities/quizes';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  baseUrl="http://localhost:8080/quiz";
  constructor(private httpClient:HttpClient) { }

public quizes(){
  return this.httpClient.get(`${this.baseUrl}/`);
}
public addQuiz(quiz:Quizes){
  return this.httpClient.post(`${this.baseUrl}/`,quiz);
}
 
public deleteQuiz(quizId:any){
  return this.httpClient.delete(`${this.baseUrl}/${quizId}`);
}
//get single quiz
public getQuiz(qId:any){
  return this.httpClient.get(`${this.baseUrl}/${qId}`);
}
//update quiz
public updateQuiz(quiz:Quizes){
    return this.httpClient.put(`${this.baseUrl}/`,quiz);
}

public getQuizByCategory(cid:any){
   return this.httpClient.get(`${this.baseUrl}/category/${cid}`);
}

public getActiveQuizes(){
  return this.httpClient.get(`${this.baseUrl}/active`);
}

public getQuizofCategoryActive(cid:any){
  return this.httpClient.get(`${this.baseUrl}/category/active/${cid}`);
}

}

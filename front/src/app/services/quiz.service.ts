import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  public quiz(){
    return this.http.get(`${baseUrl}/quiz`);
  }

  public addQuiz(quizData:any){
    return this.http.post(`${baseUrl}/quiz`,quizData);
  }

  public deleteQuiz(qid:any){
    return this.http.delete(`${baseUrl}/quiz/delete/${qid}`);
  }

  public getQuiz(qId:any){
    return this.http.get(`${baseUrl}/quiz/${qId}`);
  }

  public updateQuiz(quizData:any){
    return this.http.put(`${baseUrl}/quiz`,quizData);
  }

  public getQuizByCategory(catId:any){
    return this.http.get(`${baseUrl}/quiz/category/${catId}`);
  }

  public getActiveQuizByCategory(catId:any){
    return this.http.get(`${baseUrl}/quiz/category/active/${catId}`);
  }

  public activeQuiz(){
    return this.http.get(`${baseUrl}/quiz/category/active`);
  }
}

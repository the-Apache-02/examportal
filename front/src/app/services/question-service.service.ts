import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  constructor(
    private http:HttpClient
  ) { }

  public getAllQuestions(){
    return this.http.get(`${baseUrl}/question`);
  }

  public addQuestion(question:any){
    return this.http.post(`${baseUrl}/question`,question);
  }

  public deleteQuestion(questionId:any){
    return this.http.delete(`${baseUrl}/question/${questionId}`);
  }

  public getQuestionByQuiz(quizId:any){
    return this.http.get(`${baseUrl}/question/getQuestion/${quizId}`);
  }

  //return this.http.delete(`${baseUrl}/quiz/delete/${qid}`);


  public evaluateQuiz(question:any){
    return this.http.post(`${baseUrl}/question/evaluate`,question);
  }
}

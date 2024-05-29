import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent {
  catId:any;
  quizzes:any;
  constructor(private quizService:QuizService,
    private activatedRoute:ActivatedRoute,
    private snack:MatSnackBar
    ){

  }
  ngOnInit():void{

    this.activatedRoute.params.subscribe((param)=>{
      this.catId=param['catId'];
      console.log(this.catId);

      if(this.catId==0){
        this.quizService.activeQuiz().subscribe((data)=>{
          this.quizzes=data;
        },
        (error)=>{
          this.snack.open('error','',{
            duration:3000
          })
        }
        )
      }else{
      console.log(this.catId);
      this.quizService.getActiveQuizByCategory(this.catId).subscribe((data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes)
      },
      (error:any)=>{
        this.snack.open('Error in getting quiz by category','',{
          duration:3000
        })
      }
      )
    }
    })    
  }
}

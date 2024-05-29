import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionServiceService } from 'src/app/services/question-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-question',
  templateUrl: './view-quiz-question.component.html',
  styleUrls: ['./view-quiz-question.component.css']
})
export class ViewQuizQuestionComponent {
 
  qId=0;
  qTitle='';
  questions:any=[];
  constructor(private activateRouter:ActivatedRoute,
    
    private questionService:QuestionServiceService,
    private snack:MatSnackBar
    ){

  }

  ngOnInit():void{
    this.qId=this.activateRouter.snapshot.params['qid'];

    this.qTitle=this.activateRouter.snapshot.params['qtitle'];
    console.log(this.qId)
    console.log(this.qTitle)
    this.questionService.getAllQuestions().subscribe((data)=>{
      this.questions=data;
    },
    (error)=>{
      Swal.fire("Error","Internal Server error",error);
    }
    )
  }


  deleteQuestion(questionId:any){
    //console.log(questionId); 
    Swal.fire({
      icon:"question",
      title:"Are you sure you want to delete the question?",
      showCancelButton:true,
      confirmButtonText:"Delete"
    }).then((result)=>{

      if(result.isConfirmed){
        this.questionService.deleteQuestion(questionId).subscribe((data)=>{
          this.snack.open('Question deleted Successfully','',{
            duration:3000
          });
          this.questions=this.questions.filter((e:any)=>e.questionId!=questionId);

        },(error)=>{
          this.snack.open('error Something went Wrong','',{
            duration:3000
          });
        }
        )
      }
    })
  }
}

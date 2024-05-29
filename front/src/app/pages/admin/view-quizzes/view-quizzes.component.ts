import { Component } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent {

  quizzes:any=[
    
  ]
  constructor(private quizService:QuizService){

  }

  ngOnInit():void{
    this.quizService.quiz().subscribe((data:any)=>{
      this.quizzes=data;
      console.log("data showed");
    },
    (error:any)=>{
      Swal.fire('Error!','Error in fetching the data',error)
    }
    )
  }

  deleteQuiz(qid:any){
    Swal.fire(
      { icon:"warning",
        title:"Are you sure you want to delete?",
        confirmButtonText:"Delete",
        showCancelButton:true
      }
    ).then((result)=>{

      if(result.isConfirmed){
           this.quizService.deleteQuiz(qid).subscribe((data)=>{
            this.quizzes=this.quizzes.filter((quiz:any)=>quiz.qid!=qid);
            Swal.fire("Success",'Quiz Deleted Successfully','success');
          },
          (error)=>{
            Swal.fire("Error",'Internal Error','error');
          }
          )
      }
    })
    
   }
}

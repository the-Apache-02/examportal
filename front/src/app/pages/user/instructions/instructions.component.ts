import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent {
  
  qid:any;
  quiz:any;
  constructor(private quizService:QuizService,
    private activatedRoute:ActivatedRoute,
    private snack:MatSnackBar,
    private route:Router
    ){

  }

  ngOnInit():void{
    this.qid=this.activatedRoute.snapshot.params['qid'];
    console.log(this.qid);

    this.quizService.getQuiz(this.qid).subscribe((data)=>{
      this.quiz=data;
    },
    (error)=>{
      this.snack.open('error','',{
        duration:3000
      })
    }
    )
  }

  startQuiz(){
    Swal.fire({
      title:"Do you want to Start the quiz?",
      icon:"question",
      showCancelButton:true,
      confirmButtonText:"Start Quiz",
      cancelButtonText:"Cancel"
    }).then((result)=>{

        if(result.isConfirmed){
          this.route.navigate(['/start/'+this.qid]);
        }else{
          return;
        }
    })
    
  }


  
}

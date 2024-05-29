import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent {

  qId=0;
  quizData:any;
  cat:any;

  constructor(
    private activateRoute:ActivatedRoute,
    private quizService:QuizService,
    private categoryService:CategoryService,
    private router:Router
  ){

  }

  ngOnInit():void{
    this.qId=this.activateRoute.snapshot.params['qid'];


    this.quizService.getQuiz(this.qId).subscribe((data)=>{
      this.quizData=data;
    },(error)=>{
      Swal.fire('Error','No Quiz Available','error');
    })


    this.categoryService.categories().subscribe((data)=>{
      this.cat=data;
    },(error)=>{
      Swal.fire('Error','Internal Server error','error');
    })
  }

  updateSubmit(){
    Swal.fire({
      icon:'question',
      title:"Are you sure, You want to update?",
      confirmButtonText:"Update",
      showCancelButton:true
    }).then((result)=>
    {
        if(result.isConfirmed){
          this.quizService.updateQuiz(this.quizData).subscribe((data)=>{
            Swal.fire('Success',"Quiz updated Successfully",'success').then((e)=>{
              this.router.navigate(['admin/quizzes']);
            })
          },(error)=>{
            Swal.fire('Error','Internal Server','error');
          }
          )
        }
    }
    )
  }
}

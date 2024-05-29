import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent {

  category:any=[
    
  ];

  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestion:'',
    active:false,
    category:{
      id:''
    }
  };
  constructor(private http:HttpClient,
    private quizService:QuizService,
    private categoryService:CategoryService,
    private matSnackBar:MatSnackBar){
    
  }

  ngOnInit():void{

    this.categoryService.categories().subscribe(
      (data)=>{
        console.log(data);
        this.category=data;

      },
      (error)=>{
        Swal.fire("Error","Something went wrong","error");
      }
    )
  }

  formSubmit(){
    if(this.quizData.title.trim()=='' || this.quizData.title==null){
      this.matSnackBar.open('Title is required','',{
        duration:3000
      });
      return;
    }

    this.quizService.addQuiz(this.quizData).subscribe((data)=>{
      Swal.fire("Success","Quiz Added SuccessFully","success");
    },
    (error)=>{
      Swal.fire("Error","Internal Error","error");
    })
  }
    
}

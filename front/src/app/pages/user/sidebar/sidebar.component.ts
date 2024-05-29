import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  categories:any;
  constructor(private catService:CategoryService,
    private snack:MatSnackBar,
    private quizService:QuizService){

  }
  ngOnInit():void{
    this.catService.categories().subscribe((data)=>{
      this.categories=data;
    },
    (error)=>{
      this.snack.open("Error",'',{
        duration:3000
      })
    }
    )
  }


  getAll(){
    this.quizService.quiz().subscribe
  }
}

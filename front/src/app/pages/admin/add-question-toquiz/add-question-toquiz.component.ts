import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionServiceService } from 'src/app/services/question-service.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-add-question-toquiz',
  templateUrl: './add-question-toquiz.component.html',
  styleUrls: ['./add-question-toquiz.component.css']
})
export class AddQuestionToquizComponent {
  public editor=ClassicEditor;
  qId:any=0;
  qTitle:any;

  question={
    quiz:{
      qid:this.qId
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };

  constructor(private activatedRoute:ActivatedRoute
    ,private questionService:QuestionServiceService
    ){
    
  }

  ngOnInit():void{  
    this.qId=this.activatedRoute.snapshot.params['qid']
    this.qTitle=this.activatedRoute.snapshot.params['qtitle']
    this.question.quiz['qid']=this.qId;

  }

  addQuestion(){
    
    this.questionService.addQuestion(this.question).subscribe((data)=>{
      Swal.fire("Success","Question added Successfully Add another question",'success');
      this.question
    },
    (error)=>{
      Swal.fire("Error","Something went wrong","error");
    }
    )
  }
}

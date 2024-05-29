import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { QuestionServiceService } from 'src/app/services/question-service.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  //video access

  videoRef:any;

  



  qid:any;
  questions:any;
  isSubmit=false;
  arrayLn=0;
  quiz:any;
  attemptedQuestion=0;
  marksGot=0;
  correctAnswer=0;
  timer:any;
  constructor(private activatedRoute:ActivatedRoute,
    private questionService:QuestionServiceService,
    private snack:MatSnackBar,
    private locationSt:LocationStrategy,
    private quizService:QuizService,
    private route:Router){

    }
    private fullscreenSubscription:any;
  ngOnInit():void{
   


    //this.loadingPage();

    // this.fullscreenSubscription=this.route.events.subscribe(event=>{
    //   if(event instanceof NavigationEnd){
    //     const fullscreenElement=document.body;
        
    //     try{
    //       fullscreenElement.requestFullscreen();
    //       console.log(fullscreenElement,this.fullscreenSubscription);
    //     }catch(err){
    //       console.error("Error enterring full screen",err);
    //     }
    //   }
    // })
    
    this.preventBackButton();
    this.loadQuestions();
  }


  //set up camera
  setupCamera(){
    navigator.mediaDevices.getUserMedia({
      video:{width:250,height:100},
      audio:true
    }).then(stream=>{
      try{
        console.log(stream)
        this.videoRef.srcObject=stream
      }catch(e){
        console.log(e)
      }
    })
  }

  preventBackButton(){
    history.pushState(null,'', location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,'',location.href);
    })

  }

  loadQuestions(){
    //this.addFullScreen();
    this.qid=this.activatedRoute.snapshot.params['qid'];

    this.questionService.getQuestionByQuiz(this.qid).subscribe((data)=>{
      this.questions=data;
      this.arrayLn=this.questions.length;
      this.timer=this.arrayLn*60
      this.questions.forEach((q:any)=>{
        q['uAnswer']='';
      });
      this.countdown();
      this.switchTab();
      //setting camera
       //video setting
    this.videoRef=document.getElementById('insert');
    console.log(this.videoRef);
    this.setupCamera();
      console.log(this.questions);

    },
    (error)=>{
      this.snack.open('error','',{
        duration:3000
      })
    }
    )
  }

  finish(){
    Swal.fire({
      icon:"question",
      title:"You want to submit the quiz?",
      showCancelButton:true,
      confirmButtonText:"finish"
    }).then((result)=>{
      if(result.isConfirmed){
        this.submitQuiz();
      }
    })
  }

  countdown(){
    let t=window.setInterval(()=>{
      if(this.timer<=0){
        this.submitQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },
    1000);
  }

  submitQuiz(){

    //sent the question to the server side for evaluation
    this.questionService.evaluateQuiz(this.questions).subscribe((data:any)=>{
      this.closeCamera();
      this.isSubmit=true;
      this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
      this.correctAnswer=data.correctAnswer;
      this.attemptedQuestion=data.attemptedQuestion;
    },(error)=>{
      this.snack.open('error','',{
        duration:1000
      })
    })


  //   this.isSubmit=true;
  //   this.questions.forEach((q:any) => {

  //     if(q.uAnswer==q.answer){
  //       this.correctAnswer++;
  //     }
  //     if(q.uAnswer.trim()!=''){
  //       this.attemptedQuestion++;
  //     }
  //     let markforEachQuestion=this.questions[0].quiz.maxMarks/this.questions.length;
  //     this.marksGot=markforEachQuestion*this.correctAnswer;
  //     console.log(this.marksGot);
  // });
  }


  showCountdown(){
    let mm=Math.floor(this.timer/60);
    let ss=(this.timer-(mm*60));

    return `${mm}min:${ss}sec`;
  }

  print(){
    window.print();
  }

  switchTab(){
    window.addEventListener("visibilitychange",()=>{
      if(document.visibilityState=="hidden"){
        this.submitQuiz();
      }else{
        this.submitQuiz();
      }
    });
  }
  //Add full screen functionality calling from ""INit method""
  /*addFullScreen(){

    const fullSceenElement=document.body;

    function toggleFullScreen(){
      if(!document.fullscreenElement){
        fullSceenElement.requestFullscreen().catch((err)=>{
          console.error("Error entering full screeen:",err);
        });
      }else{
        document.exitFullscreen();
      }
    }

    document.addEventListener("fullscreenchange",()=>{
      if(document.fullscreenElement){
        this.snack.open('Entered in the full screen','',{
          duration:1000
        });
      }else{
        this.snack.open('Exit full screen','',{
          duration:1000
        })
      }
    })
  }*/


  //close the camera

  closeCamera(){
    navigator.mediaDevices.getUserMedia({
      video:false,
      audio:false
    }).then(stream=>{
      try{
        console.log(stream)
        this.videoRef.srcObject="stream"
        this.videoRef.remove();
      }catch(e){
        console.log(e)
      }
    })
  }

  // ngOnDestroy(){
  //   if(this.fullscreenSubscription){
  //     this.fullscreenSubscription.unsubscribe();
  //   }
  // }


  // Add the functionality to Submit quiz when someone load the page
  loadingPage(){
    // window.reload=()=>{
    //   this.submitQuiz();
    // };

    // if(localStorage.getItem("runFunction")){
      
    //   this.submitQuiz();
    //   localStorage.removeItem("runFunction");
    // }else{
    //   localStorage.setItem("runFunction","true");
    // }
    // let getreload:any=false;
    // document.addEventListener('DOMContentLoaded',function(){

    //   getreload=true;
    // });

    // if(getreload==true){
    //   this.submitQuiz();
    // }

  }
 
}

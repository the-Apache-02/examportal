import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private snack:MatSnackBar,
    private logService:LoginService,
    private route:Router){}
  ngOnInit():void{

  }

  public logindata={
    username:"",
    password:""
  }

  formSubmit(){
    if(this.logindata.username==null || this.logindata.username.trim()==''){
      this.snack.open('Username is required','',{duration:3000});
      return;
    }


    if(this.logindata.password==null || this.logindata.password.trim()==''){
      this.snack.open('Password is required!!','',{
        duration:3000
      });
      return;
    }


    this.logService.generateToken(this.logindata).subscribe((data:any)=>{
      console.log(data);
      console.log('success');

      this.logService.loginUser(data.token);
      console.log("local storage"+this.logService.getToken());

      this.logService.getCurrentUser().subscribe((user:any)=>{
        this.logService.setUser(user);
        console.log(user);
        //console.log("localStorage "+this.logService.getUser());

        if(this.logService.getUserRole()=='Admin'){
          // window.location.href='/admin';
          this.route.navigate(['admin']);
          this.logService.loginStatusSubject.next(true);
        }else if(this.logService.getUserRole()=='Normal'){
          // window.location.href='/user';
          this.route.navigate(['user/0']);
          this.logService.loginStatusSubject.next(true);
        }else{
          this.logService.logout();
        }
      }
      )


    },
    (error)=>{
      console.log('error');
      this.snack.open("Invalid details Try again!!!",'',
      {duration:3000}
      )
    }
    );
  
    
  }
}

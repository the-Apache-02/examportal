import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isloggedIn=false;
  authority:any=null
  user:any=null
  //userType:any=null;
  constructor(public  logService:LoginService){

  }

  ngOnInit():void{
    this.isloggedIn=this.logService.isloggedIn();
    this.user=this.logService.getUser();
    
    // if(this.isloggedIn){
      
    // }else{
    //   this.user=null
    // }

    this.logService.loginStatusSubject.asObservable().subscribe((data)=>{
      this.isloggedIn=this.logService.isloggedIn();
      this.user=this.logService.getUser();
      this.authority=this.logService.getUserRole;
    })
  }

  logout(){
    this.logService.logout();
    window.location.reload();
    //this.logService.loginStatusSubject.next(false);
    // this.isloggedIn=false;
    // this.user.username=null
  }


}

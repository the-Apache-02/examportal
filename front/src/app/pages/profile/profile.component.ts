import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user:any=null
  // user={
  //   username:null,
  //   id:null,
  //   phone:null,
  //   role:null,
  //   status:null
  // }
  constructor(private login:LoginService){

  }

  ngOnInit():void{
    this.user=this.login.getUser();
    
  }

  
}

import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserserviceService } from 'src/app/services/userservice.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private uservice:UserserviceService,
    private snack:MatSnackBar){

  }
  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  }
  ngOnInit():void{

  }
  formSubmit(){

    if(this.user.username=='' || this.user.username==null){
      //alert("please insert username");
      this.snack.open("Username is required!!",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right'
      })
      return;
    }else{
      console.log(this.user);
    }
    
    this.uservice.addUser(this.user).subscribe((data:any)=>{
      //alert('success');
      //console.log(data);
      Swal.fire('Successfully Registered!','User id is '+data.id,'success');
    },
    (error)=>{
      console.log(error);
      //alert('something went wrong')
      this.snack.open("something went wrong!",'',{
        duration:3000
      })
    });
    
  }
}

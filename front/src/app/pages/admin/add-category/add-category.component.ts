import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  category={
    title:"",
    description:""
  };

  constructor(
    private categoryService:CategoryService,
    private matSnackBar:MatSnackBar,
    private router:Router){
    
    }

  
  formSubmit(){
    if(this.category.title.trim()=='' || this.category.title==null){
      this.matSnackBar.open('Title is required','',{
      duration:3000});
      return;
    }

    //all done no error move forward to post

    this.categoryService.addCategory(this.category).subscribe((data:any)=>{
      
      Swal.fire('Success','Category added successfully','success');
      this.router.navigate([`/admin/view-category`]);
      //this.reloadComponent(true);
    },
    (error)=>{
      Swal.fire('Error','Server Error','error');
    }
    )
  }
}

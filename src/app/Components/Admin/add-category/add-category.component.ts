import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/Services/category.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
   
  constructor(private categoryService:CategoryService,private snack:MatSnackBar){}

  category={
    title:"",
    description:""
  }


  message(message:any){
    this.snack.open(message,"Try again !!!",{
      duration:5000,
    });
  }
  


validate():boolean{
 if(this.category.title=="" ||  this.category.title==null)
 { 
  this.message("Title Must not be empty!!!!");
  return false;
 }
  if(this.category.description=="" || this.category.description==null)
 {
  this.message("Description Must not be empty!!!!");
   return false;
}
 return true;
}

  addCategory(){
  if(this.validate())
   this.categoryService.addCategory(this.category).subscribe(data=>{
    this.category.title='';
    this.category.description='';
    Swal.fire({
      title: 'Added',
      icon: 'success',
      text: 'Category Added Successfully',
      timer: 5000 // 5 seconds,
    })
   },err=>{
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: 'Something went wrong',
      timer: 5000 // 5 seconds,
    })
   });
  }
}

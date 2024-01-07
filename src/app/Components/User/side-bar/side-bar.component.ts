import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/Services/category.service';
import { LoginService } from 'src/app/Services/login.service';
import { Category } from 'src/app/entities/category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit{
 constructor(private categoryService:CategoryService,private snack:MatSnackBar,public loginService:LoginService){}
  ngOnInit(): void {
   this.getCategory();
  }
  category:Category[]=[];

  getCategory(){
    this.categoryService.categories().subscribe((data:any)=>{
      this.category=data;
    },err=>{
      this.snack.open("Something Went Wrong !!!","Try again",{
        duration:5000,
      })
    });
  }

  

  confirm(){
    Swal.fire({
      title: 'Are you sure?',
       icon:'info',
      showCancelButton: true,
      confirmButtonText: 'LogOut',
    
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.logOut();
      } else if (result.isDenied) {
       
      }
    })
  }

  logOut(){
    this.loginService.logOut();
    window.location.reload();
  }


}

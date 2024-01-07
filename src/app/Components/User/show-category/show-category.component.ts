import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { LoginService } from 'src/app/Services/login.service';
import { Category } from 'src/app/entities/category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.scss']
})
export class ShowCategoryComponent {
  constructor(private categoryService:CategoryService,private snack:MatSnackBar,private router:Router,private loginService:LoginService){}
  ngOnInit(): void {
   this.getCategory();
  }
  category:Category[]=[];

  getCategory(){
    this.categoryService.categories().subscribe((data:any)=>{
      this.category=data;
    },err=>{
     
     if(err.status==0){
            Swal.fire({
              icon:'error',
              text:'Session exprired!!',
              title:'Error',
              timer:3000,
              showConfirmButton:true,
              confirmButtonText:"Login",
            }).then((result)=>{
              
              this.loginService.logOut();

               this.router.navigate(['login']);
            })
     }else
    


    Swal.fire({
      title: 'Something went wrong !!!', 
      icon:'error', 
      confirmButtonText: 'Try Again',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
           window.location.reload();
      } else if (result.isDenied) {
          
      }
    });
    });
  }
}

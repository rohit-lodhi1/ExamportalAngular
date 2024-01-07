import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit{

  holder:any;
  search:any;
constructor(private categoryService:CategoryService){}
  ngOnInit(): void {
   this.getCategories();
  }

colors=[
  {
    color:"success"
  },
  {
    color:"danger"
  },
  {
    color:"info"
  },
]

 i:number=0;

  categories:any=[ ];

  
public getCategories(){
  this.categoryService.categories().subscribe((data: any)=>{
    this.categories=data;
    this.holder=this.categories;
    console.log(this.categories);
  },
  (err: any)=>{
 
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
  

searchResults(){
  this.categories = this.holder;

  const result = this.categories.filter((q:any)=>{
      return q.title.toLowerCase().includes(this.search.toLowerCase());
  })
  if(result.length==0){
   Swal.fire({
      icon:'info',
      text:'No Quize Found',
      title:'Not Found',
      timer:3000,
      showConfirmButton:true
   })
  }
  else
   this.categories=result;
}

}

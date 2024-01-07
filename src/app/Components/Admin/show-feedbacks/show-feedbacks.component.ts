import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from 'src/app/Services/user.service';
import { Feedback } from 'src/app/entities/feedback';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-feedbacks',
  templateUrl: './show-feedbacks.component.html',
  styleUrls: ['./show-feedbacks.component.scss'],
  providers:[DatePipe]
})
export class ShowFeedbacksComponent implements OnInit{

constructor(private userService:UserService,private datePipe:DatePipe){}

  ngOnInit(): void {
    
    this.getFeedbacks();
  }
  holder:any;
  search:any;
  
feedback:Feedback[]=[];




  pageSize = 2;
  pageIndex = 0;
  pageSizeOptions = [2,5, 10, 25];
  
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
    pageEvent: PageEvent = new PageEvent;
  totalUsers=0;
  length=0;



  

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getFeedbacks();
  }

  getFeedbacks(){
      this.userService.getFeedbackByPage(this.pageIndex,this.pageSize).subscribe((data:any)=>{
        console.log(data);
          this.feedback = data.content;
          this.holder = data.content;
          this.length = data.totalElements;
        
          let i=0
          this.feedback.forEach(f=>{
             f.userId = data.content[i++].user.userId;
             f.date=this.datePipe.transform(f.date,'dd/MM/yyyy');
          })
          
      })

  }

  searchResults(){
    this.feedback = this.holder;
   if(this.search=='')    
   return ;


    let result = this.feedback.filter((q:any)=>{
        
        return q.rating==this.search;
    })
    if(result.length==0){
      
    result = this.feedback.filter((q:any)=>{
        
      return q.userId==this.search;
  })
    }


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
     this.feedback=result;
  }
 
  
  searchByRating(){
    this.feedback.filter((q:any)=>{
      return q.rating.toLowerCase().includes(this.search.toLowerCase());
  })
  }

delete(fid:any){
  
}

}

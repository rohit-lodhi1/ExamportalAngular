import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ResultServiceService } from 'src/app/Services/result-service.service';
import { User } from 'src/app/entities/User';
import { Result } from 'src/app/entities/result';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-attemptes',
  templateUrl: './user-attemptes.component.html',
  styleUrls: ['./user-attemptes.component.scss']
})
export class UserAttemptesComponent implements OnInit{
  ngOnInit(): void {
   this.activatedRoute.params.subscribe((param)=>{
      this.qid = param['qid'];
   })

      this.getResults();
  }
 


constructor(private resultService:ResultServiceService,private activatedRoute:ActivatedRoute){}

qid:any;

holder:any;

users:User[]=[];
search='';

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
  this.getResults();
}

getResults(){
        this.resultService.getUserFromResult(this.qid).subscribe((data:any)=>{
             this.users=data;
             this.holder=data;
             if(this.users.length==0){
               Swal.fire({
                 icon:'info',
                 text:'No User Attempted',
                 title:'No User',
                 showConfirmButton:true,
                 timer:3000,
                }).then((reslt)=>{
                  
                  
                })
              }
            })
}

searchResults(){
  this.users=this.holder;
    const res=this.users.filter(u=>{
         u.userName.toLowerCase().includes(this.search.toLowerCase());
    })
    if(res.length==0){
      Swal.fire({
        icon:'info',
       text:'No User Attempted',
       title:'No User',
       showConfirmButton:true,
       timer:3000,
     })    
    }
    else
    this.users=res;
}

}

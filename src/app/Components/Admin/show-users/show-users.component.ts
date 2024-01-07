import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/entities/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.scss']
})
export class ShowUsersComponent implements OnInit{

  constructor(private userService:UserService){}
status=true;
users:User[]=[];
holder:any;
search:any;

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
  ngOnInit(): void {
   this.getUsers();
  }
  
getUsers(){
  this.userService.getAllUserPage(this.pageIndex,this.pageSize).subscribe((data:any)=>{
    this.users = data.content;
    this.totalUsers = data.totalPages;
    this.length = data.totalElements;
    console.log(data);
   })
}


  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getUsers();
  }

  update(user:User){
  console.log(user)  ;
  this.userService.update(user).subscribe((data:any)=>{
    
  },err=>{
    Swal.fire({
      title:'Error',
      icon:'error',
      showConfirmButton:true,
      timer:5000
    })
  })
  }

  searchResults(){
    if(this.search==''){
          
      this.pageSize = 2;
      this.pageIndex = 0;
      this.getUsers();
    }else if(Number.parseInt(this.search)){
      this.searchById();
    }
    else 
      {
         this.searchByUsername();
      }

  }

searchById(){
  this.userService.getAllUsers().subscribe((data:any)=>{
    this.users = data;
    this.holder=data;
    let result=this.users.filter(u=>{
        return u.userId == this.search;
    })
    if(result.length==0){
         Swal.fire({
            icon:'info',
            title:'Not Found',
            text:'No user with this username',
            timer:5000,
            showConfirmButton:true,
           })     
    }else
        this.users=result;
    })

}


  searchByUsername(){
        this.userService.getAllUsers().subscribe((data:any)=>{
        this.users = data;
        this.holder=data;
        const result=this.users.filter(u=>{
            return u.userName.toLowerCase().includes(this.search.toLowerCase());
        })
        if(result.length==0){
             Swal.fire({
                icon:'info',
                title:'Not Found',
                text:'No user with this username',
                timer:5000,
                showConfirmButton:true,
               })     
        }else
            this.users=result;
        })

  }
}

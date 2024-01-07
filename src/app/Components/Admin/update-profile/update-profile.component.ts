import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/Services/login.service';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/entities/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit{
  constructor(private userService:UserService,private loginService:LoginService,private snack:MatSnackBar, public dialogRef: MatDialogRef<UpdateProfileComponent>,){}
  uId='';
  user:User = new User();
 ngOnInit(): void {
    this.getUser();
 }

 getUser(){
  this.loginService.getCurrentUser().subscribe((data:any)=>{
    this.user=data;
    console.log(this.user);
  },err=>{
  console.log(err);
  });
 }

validation(){
  if(this.user.userFirstName.trim()=='' || this.user.userFirstName==null)
  {
    this.snack.open("First Name must not be Empty","Try again !!",{
      duration:5000,
    });
    return false;
  }
  if(this.user.userLastName.trim()=='' || this.user.userLastName==null)
  {
    this.snack.open("Last Name must not be Empty","Try again !!",{
      duration:5000,
    });
    return false;
  }
  if(this.user.userMobile.trim()=='' || this.user.userMobile==null)
  {
    this.snack.open("Mobile No must not be Empty","Try again !!",{
      duration:5000,
    });
    return false;
  }
return true;
}


 update(){  
   this.userService.update(this.user).subscribe((data:any)=>{
    this.loginService.setUser(data);
     Swal.fire({
      title:'Updated',
      icon:'success',
      text:'Profile Updated SuccessFully',
      timer:5000,
     });
window.location.reload();
   },err=>{
    Swal.fire({
      title:'error',
      icon:'error',
      text:'Error in updating Profile',
     });
   })
 }
 onNoClick(): void {
  this.dialogRef.close();
}
}

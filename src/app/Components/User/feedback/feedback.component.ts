import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/Services/login.service';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/entities/User';
import { Feedback } from 'src/app/entities/feedback';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  feedback:Feedback=new Feedback;
uid:any;

user:User=new User;

constructor(private loginUser:LoginService,private snack:MatSnackBar,private userService:UserService,public dialogRef: MatDialogRef<FeedbackComponent>){}


  ngOnInit(): void {
    this.getUser();
  }



  getUser(){
     
      this.user = this.loginUser.getUser();
      this.feedback.email= this.user.userEmail;
  }


message(message:any){
  this.snack.open(message,"Try again !!!",{
    duration:5000,
  });
}

validate(){
  if(this.feedback.email=="" || this.feedback.email==null)
  {
     this.message("Please Enter Email");
  return false
  }
  if(this.feedback.message==""||this.feedback.message==null)
  {
    this.message("Please Enter feedback for us...")
    return false;
  }
  if(this.feedback.rating=="" || this.feedback.rating==null){
    this.message("Please rate us..");
    return false;
  }
  return true;
}

  submitFeedback(){
     if(this.validate()){
         this.userService.submitFeedback(this.feedback,this.user.userId).subscribe((data:any)=>{
            console.log(data);

            Swal.fire({
              icon:'success',
              title:'Submitted',
              text:'Thankyou for your precious feedback',
              timer:4000,
            })
            this.dialogRef.close();
         });
         
     }
    
  }
}

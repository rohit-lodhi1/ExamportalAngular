import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/entities/User';
import Swal from 'sweetalert2'

// CommonJS

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
user:User = new User();

constructor(private userService:UserService,private snack:MatSnackBar){}

  formSubmit(){
    if(this.user.userName=='')
    {
      this.snack.open("Username Required !!!!","ok",{
        duration:3000,
      });
      return;
    }
    
    
     this.userService.addUser(this.user).subscribe(data=>{
      //this.user=data;
    this.user=new User();
      
      Swal.fire('Success','Registration Successful','success')
     },(err)=>{
      Swal.fire({
        title: 'User already exists!!',
        icon: 'error',
        text: 'Try another username!!!',
        timer: 5000 // 5 seconds,
      })
      this.snack.open("Something went wrong!!!!!!","Try Again",{
        duration:3000,
      })
     });
     
  }
}

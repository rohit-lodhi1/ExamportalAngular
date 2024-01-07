import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/Services/login.service';
import Swal from 'sweetalert2';
import { FeedbackComponent } from '../User/feedback/feedback.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public loginService:LoginService,public dialog: MatDialog){}

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

openDialog(){
  this.dialog.open(FeedbackComponent);
}
  
}

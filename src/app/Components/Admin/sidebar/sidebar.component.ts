import { Component } from '@angular/core';
import { LoginService } from 'src/app/Services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
constructor(private loginService:LoginService){}
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

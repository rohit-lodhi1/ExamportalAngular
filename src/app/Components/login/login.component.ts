import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { window } from 'rxjs';
import { LoginService } from 'src/app/Services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

loginData ={
  userName:'',
  password:''
}

constructor(private snack:MatSnackBar,private loginService:LoginService,private router:Router){}
  ngOnInit(): void {
     if(this.loginService.isLoggedIn()){
         if(this.loginService.getUserRole()=='ADMIN')   
          this.router.navigate(['admin']);
          else
           if(this.loginService.getUserRole()=='NORMAL')
            this.router.navigate(['user-dashboard']);
              else{
                this.loginService.logOut();
              }
     }
  }



gotoPage(pageName:string){
  this.router.navigate([`${pageName}`]);
}


validate():boolean{
  if(this.loginData.userName.trim()==''|| this.loginData.userName==null)
  {
    this.snack.open("Username Required !!!!","Try Again",{
      duration:3000,
    });
    return false;
} 
if(this.loginData.password=='' || this.loginData.password==null){
  this.snack.open("Password Required !!!!","Try Again",{
    duration:3000,
  });
  return false;
}
else
return true;
}

login(){
      if(this.validate())
      {
        //   generate token
        this.loginService.generateToken(this.loginData).subscribe((data:any)=>{
             console.log(data);

             //login
             this.loginService.loginUser(data.token);


             this.loginService.getCurrentUser().subscribe((user:any)=>{
              this.loginService.setUser(user);
              console.log(user);
              //redirect ....ADMIN  : admin -dashboard
              // redirect  ...Normal : user-dashboard
              if(this.loginService.getUserRole()=="ADMIN"){
                this.gotoPage("/admin");
                
              }else if(this.loginService.getUserRole()=="NORMAL"){
                // normal user dashbaord
                this.gotoPage("/user-dashboard");
              }else{
                this.loginService.logOut();
                
              }

             })
        },
        (err)=>{
          if(err.status==0){
            Swal.fire({
              title: 'Server not online', 
              icon:'error', 
              confirmButtonText: 'Try again',
              showCancelButton:true
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                  location.reload();
              } else if (result.isDenied) {
                  
              }
            });
          }
          console.log(err);
          this.snack.open("Invalid Details !!!","Try Again",{
            duration:3000,
          })
        });

      }
          
        
    }
}

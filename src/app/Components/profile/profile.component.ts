import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/Services/login.service';
import { User } from 'src/app/entities/User';
import { UpdateProfileComponent } from '../Admin/update-profile/update-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
user:any;

constructor(private loginService:LoginService,private snack:MatSnackBar,private dialog:MatDialog){}

  ngOnInit(): void {
    this.user=this.loginService.getUser();
      if(this.user==null){

          this.snack.open("Something went wrong !!!","Try again",{
            duration:3000,
          })
      }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(UpdateProfileComponent);

  
  }
}



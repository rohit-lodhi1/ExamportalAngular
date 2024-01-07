import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { LoginService } from 'src/app/Services/login.service';
import { QuizService } from 'src/app/Services/quiz.service';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/entities/User';
import { Category } from 'src/app/entities/category';
import { Feedback } from 'src/app/entities/feedback';
import { Quizes } from 'src/app/entities/quizes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers:[DatePipe]
})
export class WelcomeComponent implements OnInit{
 constructor(private userService:UserService,private categoryService:CategoryService,private quizService:QuizService,private router:Router,private loginService:LoginService,private datePipe:DatePipe){}
 

feedback:Feedback[]=[];

 users:User[] =[];
 categories:Category[]=[];
 quizes:Quizes[]=[];
  ngOnInit(): void {
     this.userService.getAllUsers().subscribe((data:any)=>{
       this.users = data;
        this.categoryService.categories().subscribe((data:any)=>{
             this.categories=data;
        });
        this.quizService.quizes().subscribe((data:any)=>{
          this.quizes=data;
        },err=>{
          Swal.fire({
            icon:'error',
            timer:4000,
            title:'Error !!!',
            text:'Something went wrong',
            showConfirmButton:true
          }).then((result)=>{
                  this.loginService.logOut();
                this.router.navigate(['login'])
              
          })
        })
                        
     },err=>{
        
     });
     this.getFeedbacks();
  }




  
  getFeedbacks(){
    this.userService.getFeedbackByPage(0,100).subscribe((data:any)=>{
      console.log(data);
        let result = data.content;
        
      
        let i=0
        result.forEach((f: { userId: any; date: string | number | Date | null; })=>{
           f.userId = data.content[i++].user.userId;
           f.date=this.datePipe.transform(f.date,'dd/MM/yyyy');
        })

        result=result.filter((f: { rating: number; })=>{
            return f.rating<3;
        })
        i=0;
        result.forEach((r: any)=>{
             if(i<5)
            this.feedback[i++]=r;
        })
        
    })

}
}



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { ResultServiceService } from 'src/app/Services/result-service.service';
import { Ranks } from 'src/app/entities/ranks';
import { Result } from 'src/app/entities/result';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-ranks',
  templateUrl: './quiz-ranks.component.html',
  styleUrls: ['./quiz-ranks.component.scss']
})
export class QuizRanksComponent implements OnInit{

  constructor(private resultService:ResultServiceService,private activatedRoute:ActivatedRoute,private router:Router,private loginService:LoginService){}
  qid:any=0;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param=>{
       this.qid=param['qid'];
    
    })
   if(this.qid==0)
   this.getRanks();
   else
   this.getRanksById();
  }
results:Result[]=[];

  getRanks(){
    this.resultService.getRanks().subscribe((Data:any)=>{
      console.log(Data);
      this.results = Data.results;
    this.results=this.results.sort((r:Result,r1:Result)=>{
        return r.marksGot<r1.marksGot?1:0;
     });

    })
  }

  getRanksById(){
     this.resultService.getRanksByQuiz(this.qid).subscribe((data:any)=>{
       this.results = data.results;
         if(this.results.length==0)
         {
          Swal.fire({
            icon:'info',
            title:'Not Found',
            text:'No Ranks Found',
            timer:3000,
          })
         }
     },er=>{
      
        Swal.fire({
          icon:'error',
          text:'Something went wrong!!',
          title:'Error',
          timer:5000,
         confirmButtonAriaLabel:'Try again!!!',
          showConfirmButton:true
        }).then(result=>{
          if(result.isConfirmed)
           {
              if(this.loginService.getUserRole()=="ADMIN")
            this.router.navigate(["admin"])
            else this.router.navigate(["user-dashboard"])
           }else{
            this.router.navigate(["login"])
           }
        })
     })
  }
}

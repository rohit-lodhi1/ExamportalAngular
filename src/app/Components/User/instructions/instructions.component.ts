import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/Services/quiz.service';
import { Quizes } from 'src/app/entities/quizes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit{
  constructor(private activeRoute:ActivatedRoute,private quizService:QuizService,private router:Router){}
  qid:any;
  quiz:Quizes=new Quizes;
  ngOnInit(): void {
     this.qid=this.activeRoute.snapshot.params['qid'];
      this.getQuiz();
  }
  getQuiz(){
      this.quizService.getQuiz(this.qid).subscribe((data:any)=>{
        this.quiz = data;
        console.log(this.quiz);
      },err=>{
        Swal.fire({
          title: 'Something went wrong !!!', 
          icon:'error', 
          confirmButtonText: 'Try Again',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
               window.location.reload();
          } else if (result.isDenied) {
              
          }
        });
      })
  }

  startQuiz(){
    Swal.fire({
      title: 'Do you want to start the quiz', 
      icon:'info', 
      confirmButtonText: 'Start',
      showCancelButton:true
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
           this.router.navigate([`/start/${this.quiz.qid}`])
      } else if (result.isDenied) {
          
      }
    });
  }
}

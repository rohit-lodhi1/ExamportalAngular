import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/Services/questions.service';
import { Questions } from 'src/app/entities/questions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.scss']
})
export class UpdateQuestionComponent implements OnInit{
constructor(private activateRoute:ActivatedRoute,private questionService:QuestionsService,private snack:MatSnackBar,private router:Router){}

quesId='';
question:Questions=new Questions;

  ngOnInit(): void {
        this.quesId= this.activateRoute.snapshot.params['quesId'];
        this.getQuestion();
  }
  getQuestion(){
    this.questionService.getQuestionById(this.quesId).subscribe((data:any)=>{
      this.question=data;
      console.log(this.question.quiz.qid);
    })
  }



  validate():boolean{
    if(this.question.content.trim()=='' || this.question.content==null)
    {
      this.snack.open("Content must not be Empty","Try again !!",{
        duration:5000,
      });
    return false;
   }
   if(this.question.option1.trim()=='' || this.question.option1==null)
   {
     this.snack.open("Option 1 must not be Empty","Try again !!",{
       duration:5000,
     });
   return false;
  }
  if(this.question.option2.trim()=='' || this.question.option2==null)
  {
    this.snack.open("Option 2 must not be Empty","Try again !! ",{
      duration:5000,
    });
  return false;
  } 

  if(this.question.answer==''|| this.question.answer==null){
    this.snack.open("Please Select Answer","Select ",{
      duration:5000,
    });
  return false;
  }
  
    return true;
  }
  


  updateQuestion(){
    if(this.validate())
      this.questionService.updateQuestion(this.question).subscribe((data:any)=>{
        Swal.fire({
          title: 'Updated',
          icon: 'success',
          text: 'Quize Updated Successfully',
          timer: 5000 // 5 seconds,
        });
        this.router.navigate([`/admin/view-questions/${this.question.quiz.qid}/${this.question.quiz.title}`])
      },err=>{
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Something went wrong !!!',
          timer: 5000 // 5 seconds,
        });
      })
  }

}

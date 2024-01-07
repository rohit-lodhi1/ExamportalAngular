import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { QuizService } from 'src/app/Services/quiz.service';
import { Category } from 'src/app/entities/category';
import { Quizes } from 'src/app/entities/quizes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit{
  constructor(private activateRoute:ActivatedRoute,private quizSerivce:QuizService,private categoryService:CategoryService,private snack:MatSnackBar,private router:Router){}
  
  category:Category[]=[];

  qId=undefined;

  quiz:Quizes = new Quizes();

  ngOnInit(): void {

    this.qId=this.activateRoute.snapshot.params['qid'];
    this.getQuiz();
    this.getCategory();
    
  }
  
getCategory(){
  this.categoryService.categories().subscribe((data:any)=>{
    this.category=data;

},err=>{
  console.log(err);
})
}


  getQuiz(){
    this.quizSerivce.getQuiz(this.qId).subscribe((data:any)=>{
      this.quiz=data;
      console.log(this.quiz);
    },err=>{
      Swal.fire("Error!!!","Something went wrong !!!",'error');
      console.log(err);
    })
  }


  validate():boolean{
    if(this.quiz.title.trim()=='' || this.quiz.title==null)
    {
      this.snack.open("Title must not be Empty","Try again !!",{
        duration:5000,
      });
    return false;
   }
   if(this.quiz.description.trim()=='' || this.quiz.description==null)
   {
     this.snack.open("Description must not be Empty","Try again !!",{
       duration:5000,
     });
   return false;
  }
  if(this.quiz.category.cid==0 || this.quiz.description==null)
  {
    this.snack.open("Select Category","Select ",{
      duration:5000,
    });
  return false;
  } if(this.quiz.maxMarks=='' || this.quiz.maxMarks==null)
  {
    this.snack.open("MaxMarks must not be Empty","Try again !!",{
      duration:5000,
    });
  return false;
  }
  if(this.quiz.numberOfQuestions=='' || this.quiz.numberOfQuestions==null)
  {
    this.snack.open("Number Of Questions must not be Empty","Try again !!",{
      duration:5000,
    });
  return false;
  }
  
    return true;
  }
  
  

  updateQuiz(){
     if(this.validate()){
          this.quizSerivce.updateQuiz(this.quiz).subscribe((data:any)=>{
            Swal.fire({
              title: 'Updated',
              icon: 'success',
              text: 'Quize Updated Successfully',
              timer: 5000 // 5 seconds,
            });
            this.router.navigate(['/admin/view-quizes'])
          
          },err=>{
            Swal.fire({
              title: 'Error !!!',
              icon: 'error',
              text: 'Something went wrong!!!!',
              timer: 5000 // 5 seconds,
            })
          });
          
     }
  }
}

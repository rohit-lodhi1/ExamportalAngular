import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/Services/category.service';
import { QuizService } from 'src/app/Services/quiz.service';
import { Quizes } from 'src/app/entities/quizes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quizes',
  templateUrl: './add-quizes.component.html',
  styleUrls: ['./add-quizes.component.scss']
})
export class AddQuizesComponent implements OnInit{
  constructor(private categoryService:CategoryService,private snack:MatSnackBar,private quizService:QuizService){}
  ngOnInit(): void {
    this.getCategories();
  }

  category=[
    {
      cid:0,
      title:''
    },
  
  ]

quizData:Quizes = new Quizes();


message(message:any,button="Try again !!!"){
  this.snack.open(message,button,{
    duration:5000,
  });
}



validate():boolean{
  if(this.quizData.title.trim()=='' || this.quizData.title==null)
  {
    this.message("Title must not be Empty");
  return false;
 }
 if(this.quizData.description.trim()=='' || this.quizData.description==null)
 { 
  this.message("Description must not be Empty");
  return false;
 }
if(this.quizData.category.cid==0 || this.quizData.description==null)
{ 
  this.message("Select Category","Select")
  return false;
}
 if(this.quizData.maxMarks=='' || this.quizData.maxMarks==null)
{
   this.message("MaxMarks must not be Empty");
return false;
}
if(this.quizData.numberOfQuestions=='' || this.quizData.numberOfQuestions==null)
{
  this.message("Number Of Questions must not be Empty")
return false;
}
if(this.quizData.maxMarks<=0 || this.quizData.numberOfQuestions<=0){
   this.message("Values Cannot be in negative");
return false;
}

  return true;
}


addQuiz(){
  if(this.validate())
  {
     this.quizService.addQuiz(this.quizData).subscribe(data=>{
      Swal.fire({
        title: 'Added',
        icon: 'success',
        text: 'Quize Added Successfully',
        timer: 5000 // 5 seconds,
      });
      this.quizData=new Quizes();
     },err=>{
      Swal.fire({
        title: 'error',
        icon: 'error',
        text: 'Something went wrong!!!!',
        timer: 5000 // 5 seconds,
      })
     })
  }
}


  getCategories(){
    this.categoryService.categories().subscribe((data:any)=>{
      this.category=data;
      console.log(this.category);
    },(err:any)=>{
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Something went wrong',
        timer: 5000 // 5 seconds,
      })
    })
  }

}

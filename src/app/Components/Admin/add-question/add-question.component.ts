import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/Services/questions.service';
import { Questions } from 'src/app/entities/questions';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
constructor(private activatRoute:ActivatedRoute,private questionSerive:QuestionsService,private snack:MatSnackBar){}
public Editor =ClassicEditor;

qId='';
qtitle='';
question:Questions=new Questions();


  ngOnInit(): void {
     this.qId=this.activatRoute.snapshot.params['qid'];
     this.qtitle=this.activatRoute.snapshot.params['qtitle'];
      this.question.quiz.qid=parseInt(this.qId);
  }

  message(message:any){
    this.snack.open(message,"Try again !!!",{
      duration:5000,
    });
  }
  



  validate():boolean{
    if(this.question.content.trim()=='' || this.question.content==null)
    {
       this.message("Content must not be Empty");
    return false;
   }
   if(this.question.option1.trim()=='' || this.question.option1==null)
   {
      this.message("Option 1 must not be Empty");
   return false;
  }
  if(this.question.option2.trim()=='' || this.question.option2==null)
  {
     this.message("Option 2 must not be Empty");
  return false;
  } 
  if(this.question.option1.trim()==this.question.option2.trim() ){
     this.message("Options must Not be Same");
  return false;
  } 
   
  if(this.question.answer==''|| this.question.answer==null){
     this.message("Please Select Answer");
  return false;
  }
  
    return true;
  }
  




  addQuestion(){
    if(this.validate()){
  this.questionSerive.addQuestion(this.question).subscribe((data:any)=>{
    Swal.fire({
      title: 'Added',
      icon: 'success',
      showConfirmButton:true,
      text: 'Question Added Successfully',
      timer: 5000 // 5 seconds,  
    });
    this.question=new Questions();
  },err=>{
    Swal.fire({
      title: 'error',
      icon: 'error',
      showConfirmButton:true,
      text: 'Something went wrong!!!',
      timer: 5000 // 5 seconds,,
    
      
    });
  });
    }
}


}

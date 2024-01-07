import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/Services/questions.service';
import { Questions } from 'src/app/entities/questions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-questions',
  templateUrl: './show-questions.component.html',
  styleUrls: ['./show-questions.component.scss']
})
export class ShowQuestionsComponent implements OnInit{

constructor(private activeRoute:ActivatedRoute,private questionService:QuestionsService){}

qId='';
qtitle='';

  ngOnInit(): void {
    this.qId=this.activeRoute.snapshot.params['qid'];
     this.qtitle= this.activeRoute.snapshot.params['title']

this.getQuestions();
  }

  question: Questions []=[];

  getQuestions(){
    this.questionService.getQuestion(this.qId).subscribe((data:any)=>{
      this.question = data;
      console.log(this.question);
    },err=>{
      console.log(err);
    })
  }

  
  confirm(quesId:any){
    Swal.fire({
      title: 'Delete this Question?',
    icon:'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.deleteQuestion(quesId);
      } else if (result.isDenied) {
       
      }
  })
  
}

  deleteQuestion(quesId:any){
    this.questionService.deleteQuestion(quesId).subscribe(data=>{
      Swal.fire({
        title: 'Added',
        icon: 'success',
        showConfirmButton:true,
        text: 'Question Added Successfully',
        timer: 5000 // 5 seconds,  
      });
    },err=>{
      Swal.fire({
        title: 'Added',
        icon: 'success',
        showConfirmButton:true,
        text: 'Question Added Successfully',
        timer: 5000 // 5 seconds,  
      });
      this.question=this.question.filter(ques=>ques.quesId!=quesId);
    })
  }

}

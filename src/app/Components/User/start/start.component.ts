import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { QuestionsService } from 'src/app/Services/questions.service';
import { QuizService } from 'src/app/Services/quiz.service';
import { UserService } from 'src/app/Services/user.service';
import { Questions } from 'src/app/entities/questions';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  constructor(private locationSt:LocationStrategy,private router:ActivatedRoute,private questionService:QuestionsService,private _router:Router,private loginService:LoginService,private quizService:QuizService){}
  qid:any;
question:Questions[]=[];

showAnswers:any;

uId:any;

marksGot:any;
correctAnswers=0;
attempted=0;

isSubmited=false;
timer:any;

  ngOnInit(): void {
  this.preventBackButton();
this.qid=this.router.snapshot.params['qid'];
    this.loadQuestions();
  }

  preventBackButton(){
    history.pushState(null,"",location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,"",location.href);
    })
  }

  loadQuestions(){
    this.questionService.getQuestionofQuizForTest(this.qid).subscribe((data:any)=>{
        this.question=data;
        console.log(this.question);
        if(this.question.length==0)
         this.err();
         else
         {
        this.timer=this.question.length*2*60;
      this.startTimer();
         }
    },err=>{
    this.err();
    })
  }


  err(){
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
       
        this._router.navigate(["user-dashboard/view-quizes/"+0])
       }else{
        this._router.navigate(["user-dashboard/view-quizes/"+0])
       }
    })
  }


submit(){
  Swal.fire({
    icon:'info',
    text:'Do you want to submit the quiz',
    title:'Submit',
  
   confirmButtonAriaLabel:'Aubmit',
    showCancelButton:true,
    
  }).then(result=>{
   
    if(result.isConfirmed){
      
       this.timer=0;
    }
    
       
  })
}

getResult(){
  this.isSubmited=true;
      this.timer=0;
  Swal.fire({
    icon:'success',
    text:'Quiz Submited Successfully',
    title:'Submit',
    timer:5000,
   confirmButtonAriaLabel:'Ok',
  });
this.uId=this.loginService.getUser().userId;

// check quiz that show answers or not

this.quizService.getQuiz(this.qid).subscribe((data:any)=>{
  this.showAnswers = data.showAnswers;
})



/// getting result and questions with answers
this.questionService.getResult(this.question,this.uId).subscribe((Data:any)=>{
  console.log("Resutl from database");
  console.log(Data);
   this.marksGot = Number(Data[0].marksGot).toFixed();
   
  this.question=Data[1]  ;


   this.attempted=Data[0].attempted;
   this.correctAnswers = Data[0].correctAnswers;  

},err=>{
  this.marksGot=0;
})

  
}


startTimer(){
  let t = window.setInterval(()=>{
    if(this.timer<=0)
    {
      clearInterval(t);
      this.getResult();
    }else{
      this.timer--;
    }

  },1000)
}

getFormattedTime(){
  let mm = Math.floor(this.timer/60);
  let ss = this.timer-mm*60;
  return `${mm} min : ${ss} sec`;
}


printResult(){
  window.print();
}

 openPDF(quiz:any) {
  
 const pdf = new jsPDF();
 let y =10;
 let x =10;
 pdf.text("",100,0);
 pdf.text("Quiz Questions",80,y);
 y+=10;
 for(let i =0;i<this.question.length;i++){
  
  const data = this.question[i];


  const text = `Q. ${i+1}. ${data.content}`;
  
  
  pdf.text(text,x,y);
    y+=10;
 }
  pdf.save(quiz+".pdf")
}
}

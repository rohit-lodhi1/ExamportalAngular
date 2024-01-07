import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { timer } from 'rxjs';
import { QuizService } from 'src/app/Services/quiz.service';
import { Quizes } from 'src/app/entities/quizes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-quizes',
  templateUrl: './show-quizes.component.html',
  styleUrls: ['./show-quizes.component.scss']
})
export class ShowQuizesComponent implements OnInit {
cid:any;
holder:any;
search:any;


  ngOnInit(): void {
  this.activatedRoute.params.subscribe(param=>{
    this.cid=param['cid'];
  })

  this.loadQuiz();
  }

constructor(private quizService:QuizService,private activatedRoute:ActivatedRoute,private router:Router){}

  colors=[
    {
      color:"success"
    },
    {
      color:"danger"
    },
    {
      color:"info"
    },
  ]
  quizes:Quizes[] = [];
  
loadQuiz(){
  if(this.cid==0){
    this.getQuizes();
  }else{
  this.getQuizById();
  
  }
}


getQuizById(){
   this.quizService.getQuizByCategory(this.cid).subscribe((data:any)=>{
    this.quizes=data;
    
    console.log(data);
    if(this.quizes.length==0){
      Swal.fire({
        icon:'info',
        title:'No Quize',
        text:'No Quize available',
        timer:5000,
        showConfirmButton:true,
        confirmButtonText:'Add',
        showCancelButton:true,
      }).then(result=>{
          if(result.isConfirmed)
          this.router.navigate(['admin/add-quize'])
      })
     }
   },err=>{
     Swal.fire({
      icon:'error',
      title:'Error',
      text:'Something went wrong',
      showConfirmButton:true,
      timer:5000,
     }).then(result=>{
        if(result.isConfirmed)
         this.router.navigate(["'/user-dashboard/view-category/'+0"])
     })
   })
   
}


  getQuizes(){
    this.quizService.quizes().subscribe((data:any)=>{
       this.quizes=data;
       this.holder=data;
       console.log(this.quizes);
    },(err:any)=>{
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
  

  confirm(qid:any){
    Swal.fire({
      title: 'Delete this Quiz?',
      icon:'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.deleteQuiz(qid);
      } else if (result.isDenied) {
       
      }
  })
  
}
deleteQuiz(qid:any){

  this.quizService.deleteQuiz(qid).subscribe(data=>{
    Swal.fire({
      title: 'Deleted',
      icon: 'success',
      text: 'Quiz Deleted successfully',
      timer: 5000 // 5 seconds,
    })
  },err=>{
    Swal.fire("Success","Quiz Deleted Successfully",'success');
    console.log(err);
    this.quizes=this.quizes.filter((quiz)=>quiz.qid!=qid);
  });
}

searchResults(){
   this.quizes = this.holder;

   const result = this.quizes.filter(q=>{
       return q.title.toLowerCase().includes(this.search.toLowerCase());
   })
   if(result.length==0){
    Swal.fire({
       icon:'info',
       text:'No Quize Found',
       title:'Not Found',
       timer:3000,
       showConfirmButton:true
    })
   }
   else
    this.quizes=result;
}

}
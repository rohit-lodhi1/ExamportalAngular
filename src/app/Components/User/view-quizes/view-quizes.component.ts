import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/Services/quiz.service';
import { Quizes } from 'src/app/entities/quizes';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-quizes',
  templateUrl: './view-quizes.component.html',
  styleUrls: ['./view-quizes.component.scss']
})
export class ViewQuizesComponent implements OnInit{
constructor(private activateRoute:ActivatedRoute,private quizService:QuizService){}

cid:any;
quiz:Quizes[]=[];
err:any;
holder:any;
search:any;

  ngOnInit(): void {
    this.activateRoute.params.subscribe((param)=>{
      this.cid=param['cid'];
      console.log(this.cid);   
      this.getQuizes();
    });
 
  }
  

  getQuizes(){
  
   
    if(this.cid==0){
       this.loadAll() ;
    }
    else{
      this.loadQuizByID();
    }
  }

  loadAll(){
    this.quizService.getActiveQuizes().subscribe((data:any)=>{
      this.quiz = data;
      this.holder=data;
     },err=>{
      this.err='hello';
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
     });
  }

loadQuizByID() {
   this.quizService.getQuizofCategoryActive(this.cid).subscribe((data:any)=>{
    this.quiz=data;
    console.log(this.quiz);
    if(this.quiz.length==0){
      Swal.fire({
        title: 'No Quize', 
        icon:'info', 
        text:"No Quize Available",
        timer:5000,
        confirmButtonText: 'Ok',
      });
        
    }
   },err=>{
    this.err='hello';
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


searchResults(){
  
       this.quiz=this.holder;
  
      this.quiz=this.holder;
         const result =this.quiz.filter(q=>{
              return q.title.toLowerCase().includes(this.search.toLowerCase());
         });
         if(result.length==0){
           Swal.fire({
            icon:'info',
            text:'No Quiz Found',
            title:'No Found',
            showConfirmButton:true,
            timer:3000
           });
         }
         else{
          this.quiz=result;
         }
    }



 

}




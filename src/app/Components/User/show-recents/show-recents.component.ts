import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/login.service';
import { ResultServiceService } from 'src/app/Services/result-service.service';
import { Result } from 'src/app/entities/result';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-recents',
  templateUrl: './show-recents.component.html',
  styleUrls: ['./show-recents.component.scss'],
  providers: [DatePipe]
})
export class ShowRecentsComponent implements OnInit {
  constructor(private resultService:ResultServiceService,private loginService:LoginService,public datepipe: DatePipe){}
  results:Result[]=[];
search:string='';
holder:any;
  uId:any;
  public date=new Date;

  ngOnInit(): void {
    this.uId=this.loginService.getUser().userId;

    this.getResults();
  }

  

  getResults(){
    this.resultService.getResultByUser(this.uId).subscribe((data:any)=>{
      this.results=data;
      this.holder=data; 
    
      this.results.forEach(r=>{
        r.marksGot =  Number(r.marksGot).toFixed();
        // r.generateDate = r.generateDate.substring(0,11);
     // r.generateDate =  this.datepipe.transform(r.generateDate,'dd/MM/yyyy')
      })
      console.log(this.results);
    })
  }

  searchResults(){
      console.log(this.holder)
      this.results=this.holder;
      
      const result =  this.results.filter(r=>{
         return r.quiz.title.toLowerCase().includes(this.search.toLowerCase());
          
        });
       if(result.length==0){
        Swal.fire({
          icon:'info',
          title:'Not Found',
          text:'No Quiz Found',
          timer:3000,
        })
       }else
       this.results=result;
    }
    deleteResult(id:any){
      
          this.resultService.deleteResult(id).subscribe((data:any)=>{
      console.log(data)
            if(data==true)
            {
            this.results = this.results.filter(r=>{
                return r.rid!=id;
              })
            }
          })
    }
    
}

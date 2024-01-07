import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private loginService:LoginService) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = request;
     const token=this.loginService.getToken();
     console.log("Inside interceptor")
     if(token!=null){
         authReq = authReq.clone({
          setHeaders:{Authorization : `Bearer ${token}`},

        });
     }

    return next.handle(authReq);
  }
}

export const authInterceptorProviders =[{
       provide:HTTP_INTERCEPTORS,
       useClass:AuthInterceptorInterceptor,
       multi:true,
},
]

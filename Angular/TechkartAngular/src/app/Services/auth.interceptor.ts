import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   let token:any = localStorage.getItem('authToken');
   if(token!=null){
    let jwtToken =request.clone({
      setHeaders:{
        Authorization:'bearer '+token
            }
    })
    return next.handle(jwtToken);
   }
  return next.handle(request);
  }
}

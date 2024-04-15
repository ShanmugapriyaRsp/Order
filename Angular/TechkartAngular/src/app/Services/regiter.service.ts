import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Register } from '../Model/register.model';

@Injectable({
  providedIn: 'root'
})
export class RegiterService {

  constructor(private http: HttpClient) { }

  public userRegister(userDetail: Register): Observable<any> {
      return this.http.post(
        `${environment.api_url_user}/UserRegister`,
        userDetail
      );   
    }
    public productRegister(productDetail: any): Observable<any> {
      console.log(productDetail);
      return this.http.post(
        `${environment.api_url_product}/AddProduct`,
        productDetail
      );   
    }
}

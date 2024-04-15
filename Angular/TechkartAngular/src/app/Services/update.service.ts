import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private http:HttpClient) { }
  public getProductById(id:number):Observable<any>
  {   
return this.http.get(`${environment.api_url_product}/GetProductById?id=${id}`);
  }
  
  public updateProduct(updateMember:any,id:number): Observable<any> {
    // let token:any = localStorage.getItem('authToken');
    // let key = JSON.parse(token);
    // const header = new HttpHeaders({ 'Authorization': 'Bearer ' + key.value });
     return this.http.put(`${environment.api_url_product}/UpdateProduct?Id=${id}`, updateMember);
  }
}

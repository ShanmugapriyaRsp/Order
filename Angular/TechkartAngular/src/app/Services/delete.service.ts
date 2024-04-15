import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(private http:HttpClient) { }
  
  public deleteProduct(id:number):Observable<any>
  {   
      return this.http.delete(`${environment.api_url_product}/DeleteProduct?Id=${id}`);
  }
  
}

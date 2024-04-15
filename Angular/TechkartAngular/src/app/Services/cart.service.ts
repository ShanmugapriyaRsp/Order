import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  public getCarts(): Observable<any> {
    return this.http.get(
      `${environment.api_url_cart}/GetCartById`
    );   
  }


  public cartItemAdd(id: number): Observable<any> {
    // console.log(id)
    // let res = {"productId":id}
    // let response= JSON.stringify(res);
    // console.log(response)
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // return this.http.post(
    //   `${environment.api_url_cart}/AddCartItem`,response,
    //    {'headers': headers});
       return this.http.get(
        `${environment.api_url_cartItem}/AddCartItem?productId=${id}`
        );         
  }

  public deleteCartItem(id:number):Observable<any>
  {   
      return this.http.delete(`${environment.api_url_cartItem}/DeleteCartItem?Id=${id}`);
  }

  public EmptyCartItems():Observable<any>
  {   
      return this.http.delete(`${environment.api_url_cart}/EmptyCart`);
  }
}

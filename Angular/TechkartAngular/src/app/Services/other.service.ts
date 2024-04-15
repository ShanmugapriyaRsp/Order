import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../Model/product.model';
import { SnackBarComponent } from '../Shared/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  constructor(public snackBar: MatSnackBar,
    private http:HttpClient
    ) { }
  filteredValue:Product[]=[];
  openSnackBar(message: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: message,
       horizontalPosition: "center",
       verticalPosition:"top" ,
      duration: 3000
    });
  }
  public getFilterByPriceList(list:Product[]){
    console.log(list);
    this.filteredValue=list;
      }

  public filterbyprice(from:number,to:number): Observable<any> {
    return this.http.get(
      `${environment.api_url_product}/GetProductByPrice?priceFrom=${from}&priceTo=${to}`
    );   
  }
}

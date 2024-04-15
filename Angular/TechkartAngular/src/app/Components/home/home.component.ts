import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Model/product.model';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { DeleteService } from 'src/app/Services/delete.service';
import { OtherService } from 'src/app/Services/other.service';
import { ProductService } from 'src/app/Services/product.service';
import { SnackBarComponent } from 'src/app/Shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  term: any;
  product: any;
  searchData: any;
  listByPrice:any=[];
  constructor(private authService: AuthService,
    private productService: ProductService,
    private router: Router,
    private deleteProduct: DeleteService,
    public other: OtherService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getProducts()
  }

  logout() {
    this.authService.logout();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (Details: any) => {
        this.other.filteredValue=Details.value
        console.log(this.other.filteredValue);
      },
      error: (err: any) => {
        let error = err.error;
        console.log(error);
        this.other.openSnackBar(error.message);
      }
    });

  }
  onDelete(id: number) {

    this.deleteProduct.deleteProduct(id).subscribe({
      next: (response: any) =>{
        this.other.openSnackBar(response.message);
        console.log(response);
         this.getProducts();
      },
      error: (err: any) => {
        let error = err.error;
        console.log(error);
        this.other.openSnackBar(error.message);
      }    
    });
  }

  isAdmin() {
    return this.authService.isAdmin()
  }

  addItem(newItem: any) {
    this.searchData = newItem;
  }

  OnAddToCart(id:number) {
 
    this.cartService.cartItemAdd(id).subscribe({
      next:(registerDetails:any) => {
        console.log(registerDetails);
        this.other.openSnackBar(registerDetails.message);
         this.router.navigate(['cart']);
      },
      error:(err :any)=>{
        console.log(err);  
         this.other.openSnackBar(err.error.message);
      }
    });
  }
}


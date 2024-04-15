import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { OtherService } from 'src/app/Services/other.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    // products : any = [{"id":3,"title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops","price":109.95,"description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"men's clothing","image":"https://m.media-amazon.com/images/I/51tFAbNRaPL._SX522_.jpg","rating":{"rate":3.9,"count":120}}];
    products:any=[];
    grandTotal : number;
    id:number;

  constructor(private cartService: CartService,
    private other:OtherService
   ) { }

  ngOnInit(): void {
    this.getCart();
    
  }

  getCart() {
    this.cartService.getCarts().subscribe({
      next: (Details: any) => {
        this.products=Details.value.cartItems
        this.grandTotal=Details.value.grandTotal
        console.log(this.products);
      },
      error: (err: any) => {
        let error = err.error;
        console.log(error);
        this.other.openSnackBar(error.message);
      }
    });
  }
 onDelete(id:number){
   console.log(id)
  this.cartService.deleteCartItem(id).subscribe({
    next: (response: any) =>{
      this.other.openSnackBar(response.message);
      console.log(response);
       this.getCart();
    },
    error: (err: any) => {
      let error = err.error;
      console.log(error);
      this.other.openSnackBar(error.message);
    }    
  });
 }

 emptyCart(){
 this.cartService.EmptyCartItems().subscribe({
   next: (response: any) =>{
     this.other.openSnackBar(response.message);
     console.log(response);
      this.getCart();
   },
   error: (err: any) => {
     let error = err.error;
     console.log(error);
     this.other.openSnackBar(error.message);
   }    
 });
}
 

}

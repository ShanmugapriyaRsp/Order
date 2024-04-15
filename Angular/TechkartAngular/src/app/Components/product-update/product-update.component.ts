import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Model/product.model';
import { OtherService } from 'src/app/Services/other.service';
import { UpdateService } from 'src/app/Services/update.service';
import { SnackBarComponent } from 'src/app/Shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  updateForm: any;
  id: number = 0;
  productDetails: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private updateProduct: UpdateService,
    public snackbar :OtherService
    ) { }
   
  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      imgUrl: ['', Validators.required],
    });
    this.id = this.route.snapshot.params['id']
    console.log(this.id);
    this.updateProduct.getProductById(this.id).subscribe({
      next: (product: Product) =>{
        this.productDetails = product;
        console.log(this.productDetails);
         this.setFormValue();
      },
      error: (err: any) => {
        let error = err.error;
        console.log(error);
        this.snackbar.openSnackBar(error.message);
      }    
    });
  }
  setFormValue(): void {
    this.updateForm.get("name")?.setValue(this.productDetails.value.name);
    this.updateForm.get("brand")?.setValue(this.productDetails.value.brand);
    this.updateForm.get("price")?.setValue(this.productDetails.value.price);
    this.updateForm.get("category")?.setValue(this.productDetails.value.category);
    this.updateForm.get("description")?.setValue(this.productDetails.value.description);
    this.updateForm.get("imgUrl")?.setValue(this.productDetails.value.imgUrl);
  }
  get f() { return this.updateForm.controls; }

  onUpdate() {
   var value=this.updateForm.value;
    this.updateProduct.updateProduct(value,this.id).subscribe({
      next:(updateDetails:any) => {
        console.log(updateDetails);
        // let result =null;
        // result =JSON.parse(updateDetails);
        this.snackbar.openSnackBar(updateDetails.message);
         this.router.navigate(['home']);
      },
      error:(err :any)=>{
        let error= JSON.parse(err.error);     
        console.log(error);  
         this.snackbar.openSnackBar(error.message);
      }
    });
  }
  onReset() {
    this.updateForm.reset();
  }
}

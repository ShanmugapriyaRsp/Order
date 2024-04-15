import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { OtherService } from 'src/app/Services/other.service';
import { RegiterService } from 'src/app/Services/regiter.service';
import { SnackBarComponent } from 'src/app/Shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  registerForm: any;
  productDetails: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private registerProduct: RegiterService,
    public snackBar: OtherService
    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      imgUrl: ['', Validators.required],
    });
  }

  get f() { return this.registerForm.controls; }

  onRegister() {

    var value=this.registerForm.value;
     this.registerProduct.productRegister(value).subscribe({
       next:(registerDetails:any) => {
         console.log(registerDetails);
         // let result =null;
         // result =JSON.parse(registerDetails);
         this.snackBar.openSnackBar(registerDetails.message);
          this.router.navigate(['home']);
       },
       error:(err :any)=>{
         console.log(err);  
          this.snackBar.openSnackBar(err.error.message);
       }
     });
   }

   onReset() {
    this.registerForm.reset();
  }

}

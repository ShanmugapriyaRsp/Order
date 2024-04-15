import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OtherService } from 'src/app/Services/other.service';
import { RegiterService } from 'src/app/Services/regiter.service';
import { SnackBarComponent } from 'src/app/Shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: any;
  submitted = false;

  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private registerService: RegiterService,
    public snackBar: OtherService
    ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required],
      contactNumber: ['',[Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
  });
  }
  get f() { return this.registerForm.controls; }
  
 onSubmit() {
   this.submitted = true;

   this.registerService.userRegister(this.registerForm.value).subscribe({
     next:(Details: any) => {
      this.snackBar.openSnackBar(Details.message);
       if(Details.status)
         this.router.navigate(['']);
     },
     error:(err :any)=>{
       let error= err.error;     
       console.log(error);   
       this.snackBar.openSnackBar(error.message);
      }
   });
 }
}

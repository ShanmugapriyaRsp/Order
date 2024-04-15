import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { OtherService } from 'src/app/Services/other.service';
import { SnackBarComponent } from 'src/app/Shared/snack-bar/snack-bar.component';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 form : any;
 submitted=false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public snackBar: OtherService ) 
    {   }

  ngOnInit(): void {
    if (this.authService.getAuthStatus()) 
    {
      this.router.navigate(['home'])
    }
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
  });
  }
  
  get f() { return this.form.controls; }
  get username(){return this.form.get('username')}
  get password(){return this.form.get('password')}

  login() {
    this.submitted=true;

    this.authService.login(this.form.value).subscribe({
      next:(token: any) => {
        let result =null;
        result =JSON.parse(token);

        localStorage.setItem('authToken', result.value);
        console.log(JSON.parse(token));
      
        this.snackBar.openSnackBar(result.message);
        if(result && result.value)
          this.router.navigate(['home']);
      },
      error:(err :any)=>{
        this.authService.getAuthStatus();
        let error= JSON.parse(err.error);     
        console.log(error);  
         this.snackBar.openSnackBar(error.message);
        
      }
    });
  }
}

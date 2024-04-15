import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  collapsed = true;
   userName:any

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // this.userName=this.authService.userName;
    //console.log(this.userName)
     this.userName=localStorage.getItem('userName');
     console.log(localStorage.getItem('userName'));
     if(this.userName==null)
     {
      this.userName=localStorage.getItem('userName');
     }
  }

  logout()
  {
    this.authService.logout();
  }
  isLoggedIn()
    {
      return this.authService.getAuthStatus()
    }
    // userProfile(){
    //   this.userName=this.authService.userName;
    //   console.log(this.userName)
    // }
}

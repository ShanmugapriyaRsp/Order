import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService} from '@auth0/angular-jwt';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Login } from '../Model/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  roleUrl ='http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
  nameUrl='http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
  userName:string='';

  constructor(private http: HttpClient,
    private router:Router) {}

  public login(login: Login): Observable<string> {
    return this.http.post(`${environment.api_url_user}/Login`, login, {
      responseType: 'text'
    });
  }
  getAuthStatus()
  {
    let token:any = localStorage.getItem('authToken');
    if(token == null)
    {
      return false;
    }
    else{
      return true;
    }
    
  }
 public logout(){
   localStorage.clear();
   this.router.navigate(['']);
 }
 isAdmin()
 {
  let token:any = localStorage.getItem('authToken');
  if(token == null)
  return false;
  let jwt = new JwtHelperService();
  let decodedToken =jwt.decodeToken(token)
  let role = decodedToken[this.roleUrl];
  this.userName=decodedToken[this.nameUrl]
  localStorage.setItem('userName',this.userName);
  let exp=jwt.isTokenExpired(token);
  if(exp)
  {
    this.logout();
  }
  if(role == "Admin")
    return true;
      return false; }
}
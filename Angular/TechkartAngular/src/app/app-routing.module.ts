import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './Shared/header/header.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { ProductUpdateComponent } from './Components/product-update/product-update.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { AuthGuard } from './Services/auth.guard';
import { ProductAddComponent } from './Components/product-add/product-add.component';
import { PageNotFoundComponent } from './Shared/page-not-found/page-not-found.component';
import { CartComponent } from './Components/cart/cart.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"registration",component:RegistrationComponent},
  {path:"home",component:HomeComponent,canActivate: [AuthGuard]},
  {path:"productUpdate/:id",component:ProductUpdateComponent,canActivate: [AuthGuard]},
  {path:"productRegister",component:ProductAddComponent,canActivate: [AuthGuard]},
  {path:"cart",component:CartComponent,canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

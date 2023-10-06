import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalDateSelectionComponent } from './components/rental-date-selection/rental-date-selection.component';
import { PaymentSuccesfulComponent } from './components/payment-succesful/payment-succesful.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CarManagerComponent } from './components/car-manager/car-manager.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/cardetail/:carId",component:CarDetailComponent},
  {path:"cars/cardetail/:carId/rental",component:RentalDateSelectionComponent},
  {path:"cars/filter/:brandId/:colorId",component:CarComponent},

  {path:"cars/add",component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"cars/manager",component:CarManagerComponent,canActivate:[LoginGuard]},
  {path:"cars/update",component:CarManagerComponent,canActivate:[LoginGuard]},
  {path:"cars/update/:carId",component:CarUpdateComponent,canActivate:[LoginGuard]},

  {path:"brands/add",component:BrandAddComponent,canActivate:[LoginGuard]},

  {path:"colors/add",component:ColorAddComponent,canActivate:[LoginGuard]},

  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"profile",component:ProfileComponent},

  {path:"payment",component:PaymentComponent},
  {path:"payment/successful",component:PaymentSuccesfulComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

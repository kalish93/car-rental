import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CarListComponent } from "./components/car-list/car-list.component";
import { CarFormComponent } from "./components/car-form/car-form.component";
import { CarDetailComponent } from "./components/car-detail/car-detail.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { RentHistoryComponent } from "./components/rent-history/rent-history.component";
import { AllCarsListComponent } from "./components/all-cars-list/all-cars-list.component";
import { UsersListComponent } from "./components/users-list/users-list.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'cars',
    component: CarListComponent
  },
  {
    path: 'cars/register',
    component: CarFormComponent
  },
  {
    path: 'cars/:id',
    component: CarDetailComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent
  },
  {
    path: 'rent-history',
    component: RentHistoryComponent
  },
  {
    path: 'car-list',
    component: AllCarsListComponent
  },
  {
    path: 'users',
    component: UsersListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

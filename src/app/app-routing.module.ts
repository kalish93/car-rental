import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CarListComponent } from "./components/car-list/car-list.component";
import { CarFormComponent } from "./components/car-form/car-form.component";
import { CarDetailComponent } from "./components/car-detail/car-detail.component";

export const routes: Routes = [
  {
    path: 'home',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

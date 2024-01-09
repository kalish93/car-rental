import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule, DatePipe } from "@angular/common";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { materialModules } from "./material-imports";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CarFormComponent } from "./components/car-form/car-form.component";
import { CarListComponent } from "./components/car-list/car-list.component";
import { CarDetailComponent } from "./components/car-detail/car-detail.component";
import { BookFormComponent } from "./components/book-form/book-form.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { UserRentHistoryComponent } from "./components/user-rent-history/user-rent-history.component";
import { RentHistoryComponent } from "./components/rent-history/rent-history.component";
import { AllCarsListComponent } from "./components/all-cars-list/all-cars-list.component";
import { HomeComponent } from "./components/home/home.component";
import { UsersListComponent } from "./components/users-list/users-list.component";
import { AdminFormComponent } from "./components/admin-form/admin-form.component";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CarFormComponent,
    CarListComponent,
    CarDetailComponent,
    BookFormComponent,
    NavBarComponent,
    UserProfileComponent,
    UserRentHistoryComponent,
    RentHistoryComponent,
    AllCarsListComponent,
    HomeComponent,
    UsersListComponent,
    AdminFormComponent
  ],
  imports: [
    ...materialModules,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot() 

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

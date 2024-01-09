import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
isLoggedIn:boolean | undefined;
 constructor(private router: Router, private authService: AuthService){
  this.authService.isLoggedIn.subscribe((isLoggedIn) => {
    this.isLoggedIn = isLoggedIn;
  });
 }

  navigateToCarsList(){
    if(this.isLoggedIn){
      this.router.navigate(['/cars'])
    }else{
      this.router.navigate(['/login'])
    }
  }
}

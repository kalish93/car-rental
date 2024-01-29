import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean = false;
  decoded: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.updateDecoded();
    });

    const token = localStorage.getItem('accessToken');
    if (token) {
      this.decoded = jwtDecode(token); // Decode the token if it exists
    }
  }

  ngOnInit(): void {}

  updateDecoded() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.decoded = jwtDecode(token);
      this.cdr.detectChanges(); // Manually trigger change detection
    }
  }

  navigateToProfile() {
    // this.authService.getPaginatedRentHistory(1,5)
    this.router.navigate(['/profile']);
  }

  logOut() {
    localStorage.removeItem('accessToken');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

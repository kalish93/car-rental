import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {
  user: any;
  loading: boolean = true;
  error: string | null = null;


constructor(private authService: AuthService, private cdr: ChangeDetectorRef, private zone: NgZone) {
  const token = localStorage.getItem('accessToken');
  let decoded:any;
    if (token) {
      decoded = jwtDecode(token); // Decode the token if it exists
    }
  this.zone.run(() => {
    this.authService.getProfile(decoded.id).subscribe(data => {
      this.user = data;
      console.log(data, 'yyyyyyyyyyyyyyy');
      this.cdr.detectChanges(); // Manually trigger change detection
    });
  });
}


  ngOnInit(): void {
    // this.authService.getProfile().subscribe(
    //   (data) => {
    //     this.user = data;
    //     this.loading = false;
    //   },
    //   (error) => {
    //     this.error = "Failed to fetch user profile.";
    //     this.loading = false;
    //   }
    // );
  }
}

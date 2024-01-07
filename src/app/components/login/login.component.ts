import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });


  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {

  }

  get emailValidationError() {
    return this.loginForm.controls.email;
  }
  get passwordValidationError() {
    return this.loginForm.controls.password;
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email as string, password as string).subscribe(
      (response) => {
        this.openSnackBar('User logged in successfully', 'success');
        localStorage.setItem('accessToken', response.accessToken);
        this.router.navigate(['/cars']);
      },
      (error) => {
        this.openSnackBar(error.message, 'error');
      }
    );
  }
  navigateToRegistration(){
    this.router.navigate(['/register'])
  }
  openSnackBar(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [panelClass],
    });
  }
}

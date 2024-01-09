import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
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
        this.toastr.success('Logged in sucessfully','Success')
        localStorage.setItem('accessToken', response.accessToken);
        this.router.navigate(['/cars']);
        this.authService.setLoggedInStatus(true)
      },
      (error) => {
        this.toastr.error('Invalid email or password','Error')
      }
    );
  }
  navigateToRegistration(){
    this.router.navigate(['/register'])
  }
}

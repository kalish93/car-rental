import { Component, Inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrl: './admin-form.component.scss',
})
export class AdminFormComponent {
  registerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AdminFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {}

  get emailValidationError() {
    return this.registerForm.get('email');
  }

  get passwordValidationError() {
    return this.registerForm.get('password');
  }
  get passwordConfirmationValidationError() {
    return this.registerForm.get('passwordConfirmation');
  }

  get firstNameValidationError() {
    return this.registerForm.get('firstName');
  }

  get lastNameValidationError() {
    return this.registerForm.get('lastName');
  }

  get phoneNumberValidationError() {
    return this.registerForm.get('phoneNumber');
  }

  register() {
    const registrationData = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      password_confirmation: this.registerForm.value.passwordConfirmation,
      first_name: this.registerForm.value.firstName,
      last_name: this.registerForm.value.lastName,
      phone_number: this.registerForm.value.phoneNumber,
    };
    this.authService.registerAdmin(registrationData).subscribe(
      (response) => {
        this.dialogRef.close();
        this.toastr.success('Admin registered sucessfully', 'Success');
        location.reload();
      },
      (error) => {
        this.toastr.error('Admin registeration failed', 'Error');
      }
    );
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

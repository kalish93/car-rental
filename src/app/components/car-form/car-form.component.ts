import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnInit {
  carForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private carService: CarService, private snackBar: MatSnackBar, private router: Router) {
    this.carForm = this.formBuilder.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      price: ['', Validators.required],
      plate_number: ['', Validators.required],
      available: [false],
      main_picture: [null],
      rear_picture_1: [null],
      rear_picture_2: [null],
      rear_picture_3: [null]
    });
  }

  ngOnInit(): void {
    // Additional initialization logic if needed
  }

  registerCar(): void {
    if (this.carForm.valid) {
      const formData = new FormData();
      formData.append('make', this.carForm.get('make')?.value);
      formData.append('model', this.carForm.get('model')?.value);
      formData.append('year', this.carForm.get('year')?.value);
      formData.append('price', this.carForm.get('price')?.value);
      formData.append('plate_number', this.carForm.get('plate_number')?.value);
      formData.append('available', this.carForm.get('available')?.value ? '1' : '0');
      formData.append('main_picture', this.carForm.get('main_picture')?.value);
      formData.append('rear_picture_1', this.carForm.get('rear_picture_1')?.value);
      formData.append('rear_picture_2', this.carForm.get('rear_picture_2')?.value);
      formData.append('rear_picture_3', this.carForm.get('rear_picture_3')?.value);

      this.carService.carRegister(formData).subscribe(
        (response) => {
          this.openSnackBar('Car registered successfully', 'success');
          this.router.navigate(['/cars'])
        },
        (error) => {
          this.openSnackBar(error.message, 'error');
        }
      );
    }
  }

  onMainPictureSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.carForm.patchValue({ main_picture: inputElement.files[0] });
    }
  }

  onRearPicture1Selected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.carForm.patchValue({ rear_picture_1: inputElement.files[0] });
    }
  }

  onRearPicture2Selected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.carForm.patchValue({ rear_picture_2: inputElement.files[0] });
    }
  }

  onRearPicture3Selected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.carForm.patchValue({ rear_picture_3: inputElement.files[0] });
    }
  }
  openSnackBar(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [panelClass],
    });
  }
}

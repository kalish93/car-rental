import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarService } from '../../services/car.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
  bookingForm: FormGroup;
  carName: string;
  plateNumber: string;
  carPrice: number;
  carId: any;
  calculatedPrice: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<BookFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private carService: CarService,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.carName = data.carName;
    this.plateNumber = data.plateNumber;
    this.carPrice = data.carPrice;
    this.carId = data.carId;
    this.bookingForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.bookingForm.valueChanges.subscribe(() => {
      this.calculatePrice();
    });
  }

  calculateRentalCost(start: any, end: any, pricePerDay: number) {
    // Calculate the rental cost based on the rental period and daily price
    start = new Date(start);
    end = new Date(end);
    const days = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return days * pricePerDay;
  }

  calculatePrice(): void {
    const start = this.bookingForm.value.startDate;
    const end = this.bookingForm.value.endDate;
    const pricePerDay = this.carPrice;

    if (start && end) {
      this.calculatedPrice = this.calculateRentalCost(start, end, pricePerDay);
    } else {
      this.calculatedPrice = undefined;
    }
  }

  onCancelClick(): void {
    this.toastr.info('Booking process canceled', 'Info');
    this.dialogRef.close();
  }

  onBookClick(): void {
    if (this.bookingForm.valid) {
      const bookingData = {
        car_id: this.carId,
        rental_start_date: this.datePipe.transform(
          this.bookingForm.value.startDate,
          'yyyy-MM-dd HH:mm:ss'
        ),
        rental_end_date: this.datePipe.transform(
          this.bookingForm.value.endDate,
          'yyyy-MM-dd HH:mm:ss'
        ),
      };

      this.carService.rent(bookingData).subscribe(
        (response) => {
          this.dialogRef.close();
          this.router.navigate(['/cars']);
          this.toastr.success('Car booked successfully', 'Success');
        },
        (error) => {
          if (error.status === 422) {
            this.toastr.error('Validation failed. Please check the booking dates.', 'Error');
          } else {
            this.toastr.error('Car booking failed. Please try again later.', 'Error');
          }
        }
      );
    } else {
      this.toastr.warning('Please fill in all required fields', 'Warning');
    }
  }
}

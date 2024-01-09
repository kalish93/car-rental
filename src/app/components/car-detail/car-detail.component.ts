import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { MatDialog } from '@angular/material/dialog';
import { BookFormComponent } from '../book-form/book-form.component';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent implements OnInit {
  car: any;

  constructor(private route: ActivatedRoute, private carService: CarService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const carId = params['id'];
      this.carService.getCar(carId).subscribe(data => {
        this.car = data.car;
      });
    });
  }

  openBookingModal(): void {
    const dialogRef = this.dialog.open(BookFormComponent, {
      width: '400px',
      data: { carName: this.car.model, plateNumber: this.car.plate_number, carPrice: this.car.price, carId: this.car.id }
    });
  }
}

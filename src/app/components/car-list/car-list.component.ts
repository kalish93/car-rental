import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit {
  cars: any[] = [];

  constructor(private router: Router, private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe(
      (response) => {
        this.cars = response.cars;
      },
      (error) => {}
    );
  }

  navigateToForm() {
    this.router.navigate(['/cars/register']);
  }
  navigateToDetail(id: any) {
    this.router.navigate([`/cars/${id}`]);
  }
}

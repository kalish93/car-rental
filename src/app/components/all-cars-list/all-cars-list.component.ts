import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../../services/car.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-all-cars-list',
  templateUrl: './all-cars-list.component.html',
  styleUrl: './all-cars-list.component.scss'
})
export class AllCarsListComponent {
  cars: any[] = [];
  displayedColumns: string[] = ['mainPicture','make','model', 'plateNumber', 'year', 'price'];
  dataSource = new MatTableDataSource<any>();
  constructor(private router: Router, private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe(
      (response) => {
        this.cars = response.cars;
        this.dataSource.data = response.cars;
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

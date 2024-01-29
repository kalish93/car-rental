import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../../services/car.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-cars-list',
  templateUrl: './all-cars-list.component.html',
  styleUrls: ['./all-cars-list.component.scss']
})
export class AllCarsListComponent {
  cars: any[] = [];
  displayedColumns: string[] = ['mainPicture','make','model', 'plateNumber', 'year', 'price', 'actions'];
  dataSource = new MatTableDataSource<any>();
  loading = true;

  constructor(
    private router: Router,
    private carService: CarService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe(
      (response) => {
        this.cars = response.cars;
        this.dataSource.data = response.cars;
        this.loading = false; // Set loading to false when data is loaded
      },
      (error) => {
        this.loading = false; // Set loading to false in case of an error
        this.toastr.error('Failed to fetch car data', 'Error');
      }
    );
  }

  navigateToForm() {
    this.router.navigate(['/cars/register']);
  }

  navigateToDetail(id: any) {
    this.router.navigate([`/cars/${id}`]);
  }

  editCar(car: any) {
    // Implement your edit logic here
    console.log('Edit car:', car);
    this.toastr.info('Editing feature is not implemented yet', 'Info');
  }

  deleteCar(car: any) {
    this.carService.deleteCar(car.id).subscribe(
      (data) => {
        console.log('Car deleted successfully');
        this.toastr.success('Car deleted successfully', 'Success');
        // Optionally, you can remove the car from the local array to update the view instantly
        const index = this.cars.findIndex(c => c.id === car.id);
        if (index !== -1) {
          this.cars.splice(index, 1);
          this.dataSource.data = this.cars;
        }
      },
      (error) => {
        console.error('Error deleting car', error);
        this.toastr.error('Failed to delete car', 'Error');
      }
    );
  }

  changeCarStatus(car: any, newStatus: boolean) {
    this.carService.changeCarStatus(car.id, { available: newStatus }).subscribe(
      (data) => {
        console.log('Car status changed successfully');
        this.toastr.success('Car status changed successfully', 'Success');
        // Optionally, you can update the local array and the view instantly
        const index = this.cars.findIndex(c => c.id === car.id);
        if (index !== -1) {
          this.cars[index].available = newStatus;
          this.dataSource.data = this.cars;
        }
      },
      (error) => {
        console.error('Error changing car status', error);
        this.toastr.error('Failed to change car status', 'Error');
      }
    );
  }

  changeCarStatusToAvailable(car: any) {
    this.changeCarStatus(car, true);
  }

  changeCarStatusToUnavailable(car: any) {
    this.changeCarStatus(car, false);
  }
}

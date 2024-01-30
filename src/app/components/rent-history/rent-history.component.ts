import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-rent-history',
  templateUrl: './rent-history.component.html',
  styleUrl: './rent-history.component.scss'
})
export class RentHistoryComponent {
  displayedColumns: string[] = ['user','carName', 'plateNumber', 'startDate', 'endDate', 'calculatedPrice'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.getPaginatedRentHistory(10, 1);
  }

  getPaginatedRentHistory(pageSize: number, pageNumber: number): void {
    this.carService.getRentHistory(pageSize, pageNumber).subscribe((data: any) => {
      this.dataSource.data = data.data;
      this.paginator!.length = data.total;
    });
  }

}

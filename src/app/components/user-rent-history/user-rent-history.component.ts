import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-rent-history',
  templateUrl: './user-rent-history.component.html',
  styleUrl: './user-rent-history.component.scss'
})
export class UserRentHistoryComponent implements OnInit {
  displayedColumns: string[] = ['carName', 'plateNumber', 'startDate', 'endDate', 'calculatedPrice'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getPaginatedRentHistory(10, 1);
  }

  getPaginatedRentHistory(pageSize: number, pageNumber: number): void {
    this.authService.getPaginatedRentHistory(pageSize, pageNumber).subscribe((data: any) => {
      this.dataSource.data = data.data;
      this.paginator!.length = data.total; 
    });
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-user-rent-history',
  templateUrl: './user-rent-history.component.html',
  styleUrl: './user-rent-history.component.scss'
})
export class UserRentHistoryComponent implements OnInit {
  displayedColumns: string[] = ['carName', 'plateNumber', 'startDate', 'endDate', 'calculatedPrice'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    const token = localStorage.getItem('accessToken');
    let decoded:any;
    if (token) {
      decoded = jwtDecode(token); // Decode the token if it exists
    }
    this.getPaginatedRentHistory(10, 1, decoded.id);
  }

  getPaginatedRentHistory(pageSize: number, pageNumber: number, userId: any): void {
    this.authService.getPaginatedRentHistory(pageSize, pageNumber, userId).subscribe((data: any) => {
      this.dataSource.data = data.data;
      this.paginator!.length = data.total;
    });
  }

}

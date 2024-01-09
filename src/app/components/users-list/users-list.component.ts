import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminFormComponent } from '../admin-form/admin-form.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  displayedColumns: string[] = ['name','email', 'phoneNumber', 'role'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllUsers(10, 1);
  }

  getAllUsers(pageSize: number, pageNumber: number): void {
    this.authService.getAllUsers(pageSize, pageNumber).subscribe((data: any) => {
      this.dataSource.data = data.data;
      this.paginator!.length = data.total;
    });
  }

  openRegisterModal(): void {
    const dialogRef = this.dialog.open(AdminFormComponent, {
      // width: '400px',
      data: {  }
    });
  }

}

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { UpdateStatusComponent } from '../update-status/update-status.component';
import { UserService } from 'src/app/services/apis/user.service';
import { PaginationComponent } from 'src/app/components/shared/pagination/pagination.component';
import { ToastrService } from 'ngx-toastr';

import { User } from 'src/app/interface/user.interface';


import { UserService } from 'src/app/services/apis/user.service';
import { IUser } from 'src/app/interface/user.interface';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatDividerModule,
    MatDialogModule,
    PaginationComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements AfterViewInit {
  displayedColumns1: string[] = [
    'index',
    'avatar',
    'name',
    'email',
    'phone',
    'gender',
    'dob',
    'status',
    'actions',
  ];

  dataSource1 = new MatTableDataSource<User>([]);
  @ViewChild(MatSort) sort!: MatSort;

  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  filterValue: string = '';
  filterStatusValue: string = '';
  filterGenderValue: string = '';

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit() {
    this.loadData();
  }
  loadData(): void {
    const queryParams: any = {
      page: this.currentPage,
      limit: this.pageSize
    };
  
    if (this.filterValue) queryParams.search = this.filterValue;
    if (this.filterStatusValue !== '') queryParams.status = this.filterStatusValue;
    if (this.filterGenderValue !== '') queryParams.gender = this.filterGenderValue;
  
    console.log('📦 Query gửi backend:', queryParams);
  
    this.userService.getUsers(queryParams).subscribe((res: any) => {
      console.log('📥 Data từ API:', res.data);  // 👈 debug tại đây
  
      const usersWithAvatarUrl: User[] = res.data.map((user: User) => ({
        ...user,
        avatar: user.avatar ? `http://localhost:3000${user.avatar}` : 'assets/default-avatar.png',
      }));
  
      this.dataSource1 = new MatTableDataSource<User>(usersWithAvatarUrl);
      this.dataSource1.sort = this.sort;
      this.totalPages = res.totalPages || 1;
    });
  }
  

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadData();
  }

  applyFilter(event: Event) {
    const input = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filterValue = input;
    this.currentPage = 1;
    this.loadData();
  }

  resetPassword(user: User) {
    const confirmReset = confirm(`Bạn có chắc chắn muốn cấp lại mật khẩu cho ${user.name}?`);
    if (!confirmReset) return;

    this.userService.resetPassword(user.id!).subscribe({
      next: (res) => {
        alert(`Đã cấp lại mật khẩu cho ${user.name}\nMật khẩu mới: ${res.password}`);
      },
      error: (err) => {
        console.error('Lỗi khi cấp lại mật khẩu:', err);
        alert('Cấp lại mật khẩu thất bại');
      },
    });
  }
//   constructor(public dialog: MatDialog, private userService: UserService) {}
//   constructor(public dialog: MatDialog) {}

// openUpdateStatusDialog(user: any) {
//   const dialogRef = this.dialog.open(UpdateStatusComponent, {
//     width: '300px',
//     data: { status: user.status }
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     if (result) {
//       user.status = result;
//       console.log(`Trạng thái của ${user.name} đã cập nhật thành ${result}`);
//     }
//   });
// } 
//   getAllUser() {
//     //Call your user service to get all users here
//     this.userService.getAllUsers().subscribe(users => {
//       this.dataSource1.data = users;
//     });
//   }
  
}

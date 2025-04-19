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
import { ConfirmResetDialogComponent } from 'src/app/components/shared/confirm-reset-dialog/confirm-reset-dialog.component';

import { User } from 'src/app/interface/user.interface';

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
  
   
  
    this.userService.getUsers(queryParams).subscribe((res: any) => {
    
  
      const usersWithAvatarUrl: User[] = res.data.map((user: User) => ({
        ...user,
        avatarUrl: user.avatar
        ? (user.avatar.startsWith('/')
            ? `http://localhost:3000${user.avatar}`
            : `http://localhost:3000/${user.avatar}`)
        : 'https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg', 
      
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
    const dialogRef = this.dialog.open(ConfirmResetDialogComponent, {
      width: '400px',
      data: { name: user.name }
    });
  
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
      
        this.toastr.success(`Đã cấp lại mật khẩu cho ${user.name}.`, 'Email đã được gửi ');
      }
    });
  }
  


  openUpdateStatusDialog(user: User) {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}'); // hoặc cách bạn đang lưu
  
    if (user.id === currentUser?.id) {
      this.toastr.warning("Bạn không thể tự khóa tài khoản của chính mình.", "Cảnh báo");
      return;
    }
  
    const dialogRef = this.dialog.open(UpdateStatusComponent, {
      width: '300px',
      data: { status: user.status },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== null && result !== undefined) {
        this.userService.updateUserStatus(user.id!, {
          status: result.status,
          reason: result.reason
        }).subscribe({
          next: (res) => {
            const updatedUser = res.data;
            user.status = updatedUser.status;
            this.toastr.success('Cập nhật trạng thái thành công', 'Thành công');
            this.loadData();
  
            if (updatedUser.status === 0) {
              const reasonText = updatedUser.reason || 'Không rõ';
              setTimeout(() => {
                this.toastr.info(
                  `Tài khoản của ${user.name} đã bị tạm ngưng với lý do: ${reasonText}. Email đã được gửi đến ${user.email}.`,
                  '📩 Đã gửi email'
                );
              }, 1000);
            }
          },
          error: (err) => {
            this.toastr.error(err.error?.message || 'Cập nhật trạng thái thất bại', 'Lỗi');
          }
        });
      }
    });
  }
  

  filterStatus(status: string | number) {
    this.filterStatusValue = status.toString();
    this.currentPage = 1;
    this.loadData();
  }

  filterGender(gender: string) {
    this.filterGenderValue = gender;
    this.currentPage = 1;
    this.loadData();
  }
  
}

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

import { ToastrService } from 'ngx-toastr';
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
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements AfterViewInit {
  displayedColumns1: string[] = ['index', 'avatar', 'name', 'email', 'phone', 'gender', 'dob', 'status', 'actions'];
  dataSource1 = new MatTableDataSource<any>([]);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private userService: UserService, private toastr: ToastrService) {}

  ngAfterViewInit() {
    this.userService.getUsers().subscribe((res) => {
      const usersWithAvatarUrl = res.data.map((user: any) => ({
        ...user,
        avatarUrl: user.avatar
          ? `http://localhost:3000${user.avatar}`
          : 'assets/default-avatar.png', 
      }));
    
      this.dataSource1 = new MatTableDataSource(usersWithAvatarUrl);
      this.dataSource1.sort = this.sort;
    });
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }



  resetPassword(user: any) {
    const confirmReset = confirm(`Bạn có chắc chắn muốn cấp lại mật khẩu cho ${user.name}?`);
    if (!confirmReset) return;
  
    this.userService.resetPassword(user.id).subscribe({
      next: (res) => {
        alert(`Đã cấp lại mật khẩu cho ${user.name}\nMật khẩu mới: ${res.password}`);
      },
      error: (err) => {
        console.error('Lỗi khi cấp lại mật khẩu:', err);
        alert('Cấp lại mật khẩu thất bại');
      }
    });
  }
  
  openUpdateStatusDialog(user: any) {
    const dialogRef = this.dialog.open(UpdateStatusComponent, {
      width: '300px',
      data: { status: user.status }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== null && result !== undefined) {
        this.userService.updateUserStatus(user.id, result).subscribe({
          next: (res) => {
            user.status = res.data.status;
            this.toastr.success('Cập nhật trạng thái thành công', 'Thành công');
          },
          error: (err) => {
            console.error('Cập nhật trạng thái lỗi:', err);
            alert('Cập nhật trạng thái thất bại');
          }
        });
      }
    });
  }
  


  filterStatus(status: string | number) {
    this.dataSource1.filterPredicate = (data: any, filter: string) => {
      return data.status.toString() === filter;
    };
    this.dataSource1.filter = status.toString();
  }
  
  filterGender(gender: string) {
    this.dataSource1.filterPredicate = (data: any, filter: string) => {
      return data.gender === filter;
    };
    this.dataSource1.filter = gender;
  }

  
  
}



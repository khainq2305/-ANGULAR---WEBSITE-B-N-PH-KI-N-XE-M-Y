import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';  
import { MatDividerModule } from '@angular/material/divider';  
import { MatDialog } from '@angular/material/dialog';
import { UpdateStatusComponent } from '../update-status/update-status.component';
import { MatDialogModule } from '@angular/material/dialog';

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
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatDividerModule,
    MatDialogModule
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements AfterViewInit {
  displayedColumns1: string[] = ['index', 'avatar', 'name', 'email', 'phone', 'gender', 'dob', 'status', 'actions'];

  dataSource1 = new MatTableDataSource([
    {
      id: 'U001',
      avatarUrl: '',
      name: 'Nguyễn Văn A',
      email: 'vana@example.com',
      phone: '+84 123 456 789',
      gender: 'Nam',
      dob: '1995-05-20',
      status: 'Hoạt động'
    },
    {
      id: 'U002',
      avatarUrl: '',
      name: 'Trần Thị B',
      email: 'thib@example.com',
      phone: '+84 987 654 321',
      gender: 'Nữ',
      dob: '1998-09-12',
      status: 'Hoạt động'
    },
    {
      id: 'U003',
      avatarUrl: '',
      name: 'Lê Văn C',
      email: 'vanc@example.com',
      phone: '+84 456 789 123',
      gender: 'Khác',
      dob: '2000-11-25',
      status: 'Tạm ngưng'
    },
    {
      id: 'U004',
      avatarUrl: '',
      name: 'Phạm Văn D',
      email: 'vand@example.com',
      phone: '+84 333 222 111',
      gender: 'Nam',
      dob: '1989-07-14',
      status: 'Hoạt động'
    },
    {
      id: 'U005',
      avatarUrl: '',
      name: 'Hoàng Thị E',
      email: 'thie@example.com',
      phone: '+84 777 888 999',
      gender: 'Nữ',
      dob: '1993-04-30',
      status: 'Hoạt động'
    },
    {
      id: 'U006',
      avatarUrl: '',
      name: 'Đặng Văn F',
      email: 'vanf@example.com',
      phone: '+84 999 123 456',
      gender: 'Nam',
      dob: '1990-11-05',
      status: 'Hoạt động'
    },
    {
      id: 'U007',
      avatarUrl: '',
      name: 'Nguyễn Minh G',
      email: 'minhg@example.com',
      phone: '+84 888 654 321',
      gender: 'Nam',
      dob: '1988-09-20',
      status: 'Hoạt động'
    },
    {
      id: 'U008',
      avatarUrl: '',
      name: 'Lê Hoài H',
      email: 'hoaih@example.com',
      phone: '+84 777 999 555',
      gender: 'Nữ',
      dob: '1997-02-17',
      status: 'Hoạt động'
    },
    {
      id: 'U009',
      avatarUrl: '',
      name: 'Trần Đức I',
      email: 'duci@example.com',
      phone: '+84 666 123 789',
      gender: 'Nam',
      dob: '1992-08-25',
      status: 'Tạm ngưng'
    },
    {
      id: 'U010',
      avatarUrl: '',
      name: 'Bùi Kim J',
      email: 'kimj@example.com',
      phone: '+84 555 321 654',
      gender: 'Nữ',
      dob: '1995-06-12',
      status: 'Hoạt động'
    },
    {
      id: 'U011',
      avatarUrl: '',
      name: 'Phạm Văn K',
      email: 'vank@example.com',
      phone: '+84 444 567 890',
      gender: 'Nam',
      dob: '1996-12-03',
      status: 'Tạm ngưng'
    },
    {
      id: 'U012',
      avatarUrl: '',
      name: 'Ngô Thanh L',
      email: 'thanhl@example.com',
      phone: '+84 333 789 456',
      gender: 'Nam',
      dob: '1991-05-29',
      status: 'Hoạt động'
    },
    {
      id: 'U013',
      avatarUrl: '',
      name: 'Đặng Hoài M',
      email: 'hoaim@example.com',
      phone: '+84 222 654 987',
      gender: 'Nữ',
      dob: '1994-10-08',
      status: 'Hoạt động'
    }
    
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }

  filterStatus(status: string) {
    this.dataSource1.filter = status.trim().toLowerCase();
  }
  resetPassword(user: any) {
    // Giả lập hành động cấp lại mật khẩu
    console.log(`Cấp lại mật khẩu cho: ${user.name} (${user.email})`);
  
    // Hiển thị thông báo
    alert(`Mật khẩu mới đã được gửi đến email của ${user.name}`);
  }

  constructor(public dialog: MatDialog) {}

openUpdateStatusDialog(user: any) {
  const dialogRef = this.dialog.open(UpdateStatusComponent, {
    width: '300px',
    data: { status: user.status }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      user.status = result;
      console.log(`Trạng thái của ${user.name} đã cập nhật thành ${result}`);
    }
  });
}
  
}





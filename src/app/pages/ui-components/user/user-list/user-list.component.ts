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
      avatarUrl: 'https://danviet.mediacdn.vn/296231569849192448/2024/8/13/son-tung1-17235528445751231960526.png',
      name: 'Nguyễn Văn A',
      email: 'vana@example.com',
      phone: '+84 123 456 789',
      gender: 'Nam',
      dob: '1995-05-20',
      status: 'Hoạt động'
    },
    {
      id: 'U002',
      avatarUrl: 'https://images2.thanhnien.vn/528068263637045248/2025/1/20/jack-1737333866175616770624.jpeg',
      name: 'Trần Thị B',
      email: 'thib@example.com',
      phone: '+84 987 654 321',
      gender: 'Nữ',
      dob: '1998-09-12',
      status: 'Hoạt động'
    },
    {
      id: 'U003',
      avatarUrl: 'https://i.pinimg.com/236x/67/48/47/674847176cd2bf3348c75c24134ffe63.jpg',
      name: 'Lê Văn C',
      email: 'vanc@example.com',
      phone: '+84 456 789 123',
      gender: 'Khác',
      dob: '2000-11-25',
      status: 'Tạm ngưng'
    },
    {
      id: 'U004',
      avatarUrl: 'data:image/jpeg;base64,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',
      name: 'Phạm Văn D',
      email: 'vand@example.com',
      phone: '+84 333 222 111',
      gender: 'Nam',
      dob: '1989-07-14',
      status: 'Hoạt động'
    },
    {
      id: 'U005',
      avatarUrl: 'https://cafebiz.cafebizcdn.vn/162123310254002176/2025/2/26/photo6194709302313337319y-1740572412127-1740572412414558725570.jpg',
      name: 'Hoàng Thị E',
      email: 'thie@example.com',
      phone: '+84 777 888 999',
      gender: 'Nữ',
      dob: '1993-04-30',
      status: 'Hoạt động'
    },
    {
      id: 'U006',
      avatarUrl: 'https://kenh14cdn.com/203336854389633024/2025/2/24/4521141514560678506522717126627875728411194n-1740385529217-17403855293161679844384.jpg',
      name: 'Đặng Văn F',
      email: 'vanf@example.com',
      phone: '+84 999 123 456',
      gender: 'Nam',
      dob: '1990-11-05',
      status: 'Hoạt động'
    },
    {
      id: 'U007',
      avatarUrl: 'https://nguoinoitieng.tv/images/nnt/103/0/bgxh.jpg',
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





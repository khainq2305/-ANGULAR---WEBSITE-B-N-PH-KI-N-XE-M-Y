import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { UpdateStatusDialogComponent } from 'src/app/shared/update-status-dialog/update-status-dialog.component';
import { ConfirmCancelDialogComponent } from 'src/app/shared/confirm-cancel-dialog/confirm-cancel-dialog.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatTableModule, 
    MatIconModule, 
    MatButtonModule, 
    MatInputModule, 
    RouterModule, 
    FormsModule,
    MatMenuModule
  ],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {
  displayedColumns = ['orderId', 'email', 'orderDate', 'totalAmount', 'status', 'paymentStatus', 'actions'];

  dataSource = [
    { orderId: 315, email: 'khainqpc08388@gmail.com', orderDate: '2025-03-03', totalAmount: 2471000, status: 'Chờ xác nhận', paymentMethod: 'Thanh toán khi nhận hàng', paymentStatus: 'Chưa thanh toán' },
    { orderId: 314, email: 'nguyenquockhai.2305@gmail.com', orderDate: '2025-03-02', totalAmount: 444000, status: 'Đã xác nhận', paymentMethod: 'Thanh toán khi nhận hàng', paymentStatus: 'Chưa thanh toán' },
    { orderId: 313, email: 'khainqpc08388@gmail.com', orderDate: '2025-03-02', totalAmount: 1980000, status: 'Đang giao', paymentMethod: 'Chuyển khoản', paymentStatus: 'Đã thanh toán' },
    { orderId: 312, email: 'khainqpc08388@gmail.com', orderDate: '2025-03-02', totalAmount: 1980000, status: 'Đã giao', paymentMethod: 'Chuyển khoản', paymentStatus: 'Chưa thanh toán' },
    { orderId: 311, email: 'khainqpc08388@gmail.com', orderDate: '2025-03-02', totalAmount: 1500000, status: 'Đã hủy', paymentMethod: 'Thanh toán khi nhận hàng', paymentStatus: 'Chưa thanh toán' },
  ];

  filteredOrders = [...this.dataSource];
  selectedStatus = 'Tất cả';
  searchOrderId: string = '';

  constructor(private router: Router, public dialog: MatDialog) {}

  // ✅ Xem chi tiết đơn hàng
  viewOrderDetail(orderId: number) {
    this.router.navigate(['/ui-components/order/order-detail', orderId]);
  }

  // ✅ Mở hộp thoại xác nhận hủy đơn hàng
  openConfirmCancelDialog(orderId: number) {
    const dialogRef = this.dialog.open(ConfirmCancelDialogComponent, {
      width: '400px',
      data: { orderId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cancelOrder(orderId, result);
      }
    });
  }

  // ✅ Hủy đơn hàng với lý do
  cancelOrder(orderId: number, reason: string) {
    console.log(`Đơn hàng #${orderId} đã bị hủy. Lý do: ${reason}`);
    // 🔥 Nếu có API hủy đơn, gọi tại đây
  }

  // ✅ Lọc đơn hàng theo trạng thái
  filterStatus(status: string) {
    this.selectedStatus = status;
    this.applyFilters();
  }

  // ✅ Tìm kiếm đơn hàng theo mã
  searchOrders() {
    this.applyFilters();
  }

  // ✅ Áp dụng bộ lọc
  applyFilters() {
    this.filteredOrders = this.dataSource.filter(order => {
      const matchesStatus = this.selectedStatus === 'Tất cả' || order.status === this.selectedStatus;
      const matchesSearch = this.searchOrderId === '' || order.orderId.toString().includes(this.searchOrderId);
      return matchesStatus && matchesSearch;
    });
  }

  // ✅ Mở hộp thoại cập nhật trạng thái
  updateOrderStatus(order: any) {
    const dialogRef = this.dialog.open(UpdateStatusDialogComponent, {
      width: '400px',
      data: { order }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        order.status = result;
        console.log(`Cập nhật trạng thái đơn hàng #${order.orderId} thành: ${result}`);
      }
    });
  }
}

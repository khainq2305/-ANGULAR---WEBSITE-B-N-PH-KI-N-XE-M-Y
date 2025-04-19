import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { UpdateStatusDialogComponent } from 'src/app/components/shared/update-status-dialog/update-status-dialog.component';
import { ConfirmCancelDialogComponent } from 'src/app/components/shared/confirm-cancel-dialog/confirm-cancel-dialog.component';
import { OrderService } from 'src/app/services/apis/order.service';
import { PaginationComponent } from 'src/app/components/shared/pagination/pagination.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    RouterModule,
    MatDialogModule,
    PaginationComponent
  ]
})
export class OrderListComponent implements OnInit {
  displayedColumns = ['orderCode', 'email', 'createdAt', 'totalAmount', 'status', 'paymentStatus', 'actions'];

  dataSource: any[] = [];
  filteredOrders: any[] = [];

  selectedStatus = 'Tất cả';
  searchOrderId: string = '';
  selectedPaymentStatus: string = '';
  sortOrder: string = 'desc';
  fromDate?: Date;
  toDate?: Date;

  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;

  constructor(
    private orderService: OrderService,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    const statusCode = this.mapStatusLabelToCode(this.selectedStatus);

    const params: any = {
      search: this.searchOrderId,
      status: statusCode !== null ? statusCode : '',
      payment_status: this.selectedPaymentStatus,
      sort: this.sortOrder,
      page: this.currentPage,
      limit: this.pageSize
    };

    if (this.fromDate) params.fromDate = this.fromDate.toISOString();
    if (this.toDate) params.toDate = this.toDate.toISOString();

    this.orderService.getOrders(params).subscribe({
      next: (res) => {
        this.dataSource = res.data.map((order: any) => ({
          orderCode: order.order_code,
          orderId: order.id,
          rawStatusCode: order.status, // 👈 thêm dòng này để truyền vào dialog
          email: order.customer?.email || 'Không có email',
          createdAt: new Date(order.createdAt).toLocaleDateString(),
          totalAmount: order.total_price,
          status: this.mapStatus(order.status),
          paymentStatus: ({
            paid: 'Đã thanh toán',
            pending: 'Chưa thanh toán',
            failed: 'Thất bại'
          } as Record<string, string>)[order.payment_status] || 'Không rõ',
        }));
        this.filteredOrders = [...this.dataSource];
        this.totalPages = res.totalPages || 1;
      },
      error: (err) => {
        this.toastr.error('Không thể lấy danh sách đơn hàng', 'Lỗi');
      }
    });
  }

  changePage(newPage: number) {
    this.currentPage = newPage;
    this.fetchOrders();
  }

  mapStatus(statusCode: number): string {
    switch (statusCode) {
      case 0: return 'Chờ xác nhận';
      case 1: return 'Đã xác nhận';
      case 2: return 'Đang giao';
      case 3: return 'Đã giao';
      case 4: return 'Đã hủy';
      default: return 'Không rõ';
    }
  }

  mapStatusLabelToCode(label: string): number | null {
    switch (label) {
      case 'Chờ xác nhận': return 0;
      case 'Đã xác nhận': return 1;
      case 'Đang giao': return 2;
      case 'Đã giao': return 3;
      case 'Đã hủy': return 4;
      default: return null;
    }
  }

  viewOrderDetail(orderId: number) {
    this.router.navigate(['/admin/ui-components/order/order-detail', orderId]);
  }

  openConfirmCancelDialog(orderId: number) {
    const order = this.filteredOrders.find(o => o.orderId === orderId);

    if (order?.status === 'Đã hủy') {
      this.toastr.warning('Đơn hàng đã bị hủy trước đó rồi', 'Thông báo');
      return;
    }

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

  cancelOrder(orderId: number, reason: string) {
    this.orderService.cancelOrder(orderId, reason).subscribe({
      next: () => {
        const order = this.filteredOrders.find(o => o.orderId === orderId);
        this.toastr.success(`Đã hủy đơn hàng ${order?.orderCode || '#' + orderId}`, 'Thành công');
        this.fetchOrders();
      },
      error: (err) => {
        const status = err?.status;
        const message = err?.error?.message || 'Lỗi khi hủy đơn hàng';

        if (status === 400 && message.includes('đã thanh toán')) {
          this.toastr.error('Không thể hủy đơn đã thanh toán hoặc đang giao', 'Thông báo');
        } else if (status === 400 && message.includes('đã bị hủy')) {
          this.toastr.warning('Đơn hàng đã bị hủy trước đó rồi', 'Cảnh báo');
        } else {
          this.toastr.error(message, 'Lỗi');
        }
      }
    });
  }

  updateOrderStatus(order: any) {
    if (order.status === 'Đã hủy') {
      this.toastr.warning('Không thể cập nhật đơn hàng đã bị hủy', 'Cảnh báo');
      return;
    }

    const dialogRef = this.dialog.open(UpdateStatusDialogComponent, {
      width: '400px',
      data: { orderId: order.orderId, statusCode: order.rawStatusCode } // 👈 truyền mã trạng thái hiện tại
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result !== null) {
        this.orderService.updateStatus(order.orderId, +result).subscribe({
          next: () => {
            this.toastr.success(`Đã cập nhật trạng thái đơn hàng ${order.orderCode}`, 'Thành công');

            const index = this.filteredOrders.findIndex(o => +o.orderId === +order.orderId);
            if (index !== -1) {
              this.filteredOrders[index].status = this.mapStatus(result);
            }
          },
          error: (err) => {
            const message = err?.error?.message || 'Đã xảy ra lỗi khi cập nhật trạng thái';
            this.toastr.error(message, 'Lỗi');
          }
        });
      }
    });
  }

  filterStatus(status: string) {
    this.selectedStatus = status;
    this.fetchOrders();
  }
}

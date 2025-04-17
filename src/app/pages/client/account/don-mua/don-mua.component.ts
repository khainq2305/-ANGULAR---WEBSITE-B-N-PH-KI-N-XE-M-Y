import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/apis/order.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDialogComponent } from 'src/app/components/review-dialog/review-dialog.component';

// ❗ Import đầy đủ mấy cái bị thiếu:
import { NgIf, NgFor, AsyncPipe, DecimalPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-don-mua',
  standalone: true,
  imports: [
    CommonModule,       // ✅ để dùng *ngIf, *ngFor, |number
    NgIf,
    NgFor,
    DecimalPipe,
  ],
  templateUrl: './don-mua.component.html',
  styleUrls: ['./don-mua.component.scss'],
})
export class DonMuaComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.orderService.getOrdersByUser().subscribe({
      next: (res) => (this.orders = res.orders || []),
      error: (err) => console.error('❌ Lỗi khi lấy đơn hàng:', err),
    });
  }

  isReviewAvailable(orderDate: string): boolean {
    const now = new Date();
    const date = new Date(orderDate);
    return (now.getTime() - date.getTime()) / (1000 * 3600 * 24) <= 15;
  }

  openReviewPopup(order: any, detail: any): void {
    this.dialog.open(ReviewDialogComponent, {
      width: '600px',
      data: { order, product: detail.product },
    });
  }

  mapStatus(status: number): string {
    return ['Chờ xác nhận', 'Đã xác nhận', 'Đang giao', 'Đã giao', 'Đã hủy'][status] || 'Không rõ';
  }
}

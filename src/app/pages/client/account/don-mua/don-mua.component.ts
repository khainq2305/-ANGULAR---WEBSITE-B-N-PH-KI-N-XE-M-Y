import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/apis/order.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDialogComponent } from 'src/app/components/review-dialog/review-dialog.component';
import { NgIf, NgFor, DecimalPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-don-mua',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, DecimalPipe, FormsModule],
  templateUrl: './don-mua.component.html',
  styleUrls: ['./don-mua.component.scss'],
})
export class DonMuaComponent implements OnInit {
  orders: any[] = [];
  selectedTab: string = 'Tất cả';
  searchText: string = '';

  tabs = [
    { label: 'Tất cả', status: null },
    { label: 'Chờ xác nhận', status: 0 },
    { label: 'Đã xác nhận', status: 1 },
    { label: 'Đang giao', status: 2 },
    { label: 'Đã giao', status: 3 },
    { label: 'Đã huỷ', status: 4 },
  ];

  constructor(private orderService: OrderService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadOrdersByStatus(null);
  }

  loadOrdersByStatus(status: number | null): void {
    const params = status === null ? {} : { status };
    
    this.orderService.getOrdersByUser(params).subscribe({
      next: (res) => {
        this.orders = (res.orders || []).map((order: any, index: number) => {
          const parsedStatus = Number(order.status);
          console.log(`📦 [Order ${index}] status =`, order.status, '→', parsedStatus); // ✅ DEBUG log
  
          return {
            ...order,
            status: parsedStatus, // ✅ Ép kiểu rõ ràng
          };
        });
      },
      error: (err) => console.error('❌ Lỗi khi lấy đơn hàng:', err),
    });
  }
  

  onTabChange(tabLabel: string): void {
    this.selectedTab = tabLabel;
    const tab = this.tabs.find(t => t.label === tabLabel);
    const targetStatus = tab?.status ?? null;
    this.loadOrdersByStatus(targetStatus);
  }

  get filteredOrders(): any[] {
    if (!this.searchText.trim()) return this.orders;
    const keyword = this.searchText.toLowerCase();
    return this.orders.filter(order =>
      order.orderDetails.some((d: any) =>
        d.product.name.toLowerCase().includes(keyword)
      )
    );
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
    return ['Chờ xác nhận', 'Đã xác nhận', 'Đang giao', 'Đã giao', 'Đã huỷ'][status] || 'Không rõ';
  }

  getReviewDeadline(createdAt: string): string {
    const created = new Date(createdAt);
    const deadline = new Date(created.getTime() + 15 * 24 * 60 * 60 * 1000);
    return deadline.toLocaleDateString('vi-VN');
  }

  getOrderStatusDisplay(status: any): { label: string; color: string } {
    const statusNum = Number(status); 
    switch (statusNum) {
      case 0: return { label: 'CHỜ XÁC NHẬN', color: 'red' };
      case 1: return { label: 'ĐÃ XÁC NHẬN', color: 'red' };
      case 2: return { label: 'ĐANG GIAO', color: 'red' };
      case 3: return { label: 'HOÀN THÀNH', color: 'green' };
      case 4: return { label: 'ĐÃ HUỶ', color: 'red' };
      default: return { label: 'Không rõ trạng thái', color: 'red' };
    }
  }
  
}

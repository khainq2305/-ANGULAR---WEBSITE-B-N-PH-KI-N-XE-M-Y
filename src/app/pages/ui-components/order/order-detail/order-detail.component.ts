import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from 'src/app/services/common/api.service';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config'; // nhớ import nếu chưa

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule
  ],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  // Inject ActivatedRoute và ApiService bằng cú pháp mới
  route = inject(ActivatedRoute);
  api = inject(ApiService);

  // Khai báo biến hiển thị dữ liệu
  order: any;
  displayedColumns = ['image', 'name', 'quantity', 'originalPrice', 'discountPrice'];

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id'); // Lấy id từ URL

    if (orderId) {

      this.api.get<any>(`${API_ENDPOINT.order.base}/${orderId}`).subscribe({
      
        next: (res) => {
          console.log('API trả về:', res.data); // <- THÊM DÒNG NÀY
          this.order = this.formatOrder(res.data);
        },
        
        error: (err) => {
          console.error('Lỗi khi lấy chi tiết đơn hàng:', err);
        }
      });
    }
  }

  // Định dạng dữ liệu đơn hàng để hiển thị
  formatOrder(data: any) {
    return {
      orderId: data.idOrder,
      customerName: data.customer?.name,
      phoneNumber: data.customer?.phone,
      email: data.customer?.email,
      orderDate: new Date(data.createdAt).toLocaleDateString(),

      status: data.status,
      totalAmount: data.total_price,
      cancelReason: data.cancel_reason,
      products: data.orderDetails?.map((item: any) => ({
        image: item.product?.image || 'https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1606896462429-8O8VDQAB9SE5Z1YJ0LIV/454a7f83d9497c1b26edae3780534544.jpg?format=1000w',
        name: item.product?.name,
        quantity: item.quantity,
        originalPrice: item.product?.price,
        discountPrice: item.unit_price
      })) || []
    };
  }

  mapStatus(statusCode: number): string {
    const statusMap: any = {
      0: 'Chờ xác nhận',
      1: 'Đã xác nhận',
      2: 'Đang giao',
      3: 'Đã giao',
      4: 'Đã hủy'
    };
    return statusMap[statusCode] || 'Không rõ';
  }
  
}

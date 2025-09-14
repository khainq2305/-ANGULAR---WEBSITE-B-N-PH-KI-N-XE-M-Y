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
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config'; 
import { enviroment } from 'src/environments/environment';
const BASE_IMAGE_URL = `${enviroment.apiUrl}/uploads`;

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
  
  route = inject(ActivatedRoute);
  api = inject(ApiService);

 
  order: any;
  displayedColumns = ['image', 'name', 'quantity', 'originalPrice', 'discountPrice'];

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');

    if (orderId) {

      this.api.get<any>(`${API_ENDPOINT.order.base}/${orderId}`).subscribe({
      
        next: (res) => {
       
          this.order = this.formatOrder(res.data);
        },
        
        error: (err) => {
          console.error('Lỗi khi lấy chi tiết đơn hàng:', err);
        }
      });
    }
  }

  
  formatOrder(data: any) {
    return {
      
      orderId: data.id,
      orderCode: data.order_code, 
      customerName: data.name || data.customer?.name || 'Không rõ',
      phoneNumber: data.phone || data.customer?.phone || 'Không rõ',
      email: data.customer?.email || 'Không rõ',
      orderDate: new Date(data.createdAt).toLocaleDateString(),
      status: data.status,
      totalAmount: data.total_price,
      cancelReason: data.cancel_reason || '',
      address: data.shippingAddress
        ? `${data.shippingAddress.address_detail}, ${data.shippingAddress.ward_name}, ${data.shippingAddress.district_name}, ${data.shippingAddress.province_name}`
        : 'Không có địa chỉ',
  
        products: data.orderDetails?.map((item: any) => {
          const price = item.product?.price ?? 0;
          const discount = item.product?.discount ?? 0;
          const finalPrice = price - discount;
        
          return {
            image: item.product?.image 
              ? `${BASE_IMAGE_URL}/${item.product.image}` 
              : 'https://shop2banh.vn/images/thumbs/2024/02/nhot-repsol-smarter-scooter-4t-5w-40-08lit-products-1965.jpg',
            name: item.product?.name,
            quantity: item.quantity,
            originalPrice: price,
            discountPrice: finalPrice 
          };
        }) || []
        
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

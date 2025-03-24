import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatInputModule } from '@angular/material/input';  
import { MatSelectModule } from '@angular/material/select'; 
import { MatOptionModule } from '@angular/material/core'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,  
    MatInputModule,  
    MatSelectModule, 
    MatOptionModule, 
  ],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {
  order = {
    orderId: 315,
    customerName: 'Khải Nguyễn Quốc',
    phoneNumber: '0901234567',
    email: 'khainqpc08388@gmail.com',
    orderDate: '2025-03-03',
    status: 'Đã hủy',
    totalAmount: 2471000,
    cancelReason: 'Khách không nhận hàng',
    products: [
      { 
   image: 'https://shop2banh.vn/images/thumbs/2024/10/phuoc-rcb-flow-pro-cho-vario-click-chinh-hang-2365-slide-products-670784b987c3c.jpg',
         name: 'Phuộc RCB Flow Pro cho Vario, Click chính hãng',
        quantity: 2, 
        originalPrice: 1200000, 
        discountPrice: 990000, 
      
      },
      { 
        image: 'https://shop2banh.vn/images/thumbs/2022/07/dia-kingspeed-260mm-mau-moi-4-lo-1860-slide-products-62ce51d3a941b.jpg',
        name: 'Đĩa KingSpeed 260mm mẫu mới 4 lỗ',
        quantity: 1, 
        originalPrice: 550000, 
        discountPrice: 491000, 
       
      }
    ]
  };
}


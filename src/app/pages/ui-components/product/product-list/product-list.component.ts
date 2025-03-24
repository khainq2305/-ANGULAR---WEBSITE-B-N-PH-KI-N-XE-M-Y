import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { ConfirmDialogComponent } from 'src/app/components/shared/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDatepickerModule,      
    MatNativeDateModule,
    FormsModule , 
    MatCheckboxModule, 
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatInputModule,
    RouterModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  displayedColumns = ['select', 'stt', 'image', 'price', 'discount', 'category', 'quantity', 'status', 'action'];


  dataSource = [
    {
      id: 1,
      imagePath: 'https://shop2banh.vn/images/thumbs/2022/07/dia-kingspeed-260mm-mau-moi-4-lo-1860-slide-products-62ce51d3a941b.jpg',
      name: 'Đĩa KingSpeed 260mm mẫu mới 4 lỗ',
      category: 'Đĩa xe máy',
      price: 2500000,
      discount: 2200000,
      stock: 15,
      priority: 'confirmed',
      selected: false 
    },
    {
      id: 2,
      imagePath: 'https://shop2banh.vn/images/thumbs/2024/10/phuoc-rcb-flow-pro-cho-vario-click-chinh-hang-2365-slide-products-670784b987c3c.jpg',
      name: 'Phuộc RCB Flow Pro cho Vario, Click chính hãng',
      category: 'Phuộc xe máy',
      price: 500000,
      discount: 450000,
      stock: 30,
      priority: 'cancelled',
      selected: false 
    },
    {
      id: 3,
      imagePath: 'https://shop2banh.vn/images/thumbs/2024/10/nhot-liqui-moly-molygen-scooter-5w30-08l-2368-slide-products-66fe088d4c7fb.png',
      name: 'Nhớt Liqui Moly Molygen Scooter 5W30 0.8L',
      category: 'Nhớt xe máy',
      price: 800000,
      discount: 750000,
      stock: 10,
      priority: 'cancelled',
      selected: false 
    },
    {
      id: 4,
      imagePath: 'https://shop2banh.vn/images/thumbs/2024/05/den-led-2-tang-zhipat-phien-ban-sportline-cho-wave-alpha-110-2006-2024-2309-slide-66505982ea21c.jpg',
      name: 'Đèn led 2 tầng Zhi.Pat phiên bản Sportline cho Wave Alpha 110 (2006 - 2024)',
      category: 'Đèn led xe máy',
      price: 800000,
      discount: 750000,
      stock: 10,
      priority: 'cancelled',
      selected: false
    },
    {
      id: 5,
      imagePath: 'https://shop2banh.vn/images/thumbs/2022/03/tay-thang-rcb-s3-chinh-hang-cho-exciter-1702-slide-products-62272648e29f3.jpg',
      name: 'Tay thắng RCB S3 cho Exciter 155, Exciter 150, Exciter 135 các đời,... chính hãng',
      category: 'Tay thắng + Phụ kiện',
      price: 800000,
      discount: 750000,
      stock: 10,
      priority: 'cancelled',
      selected: false 
    },
  ];
   
   filteredProducts = this.dataSource;
   constructor(private dialog: MatDialog) {}

   openConfirmDialog() {
     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
       width: '400px',
       data: { message: 'Bạn có chắc chắn muốn xóa sản phẩm này?' }
     });
 
     dialogRef.afterClosed().subscribe(result => {
       if (result) {
         console.log('Người dùng đã xác nhận xóa!');
       } else {
         console.log('Hủy xóa!');
       }
     });
   }

toggleSelectAll(event: any) {
  this.dataSource.forEach(p => p.selected = event.checked);
}


isAllSelected() {
  return this.dataSource.every(p => p.selected);
}


isIndeterminate() {
  return this.dataSource.some(p => p.selected) && !this.isAllSelected();
}

}
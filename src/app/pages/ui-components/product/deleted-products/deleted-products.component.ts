import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-deleted-products',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatDialogModule // Import MatDialogModule
  ],
  templateUrl: './deleted-products.component.html',
  styleUrls: ['./deleted-products.component.scss']
})
export class DeletedProductsComponent {
  constructor(private dialog: MatDialog) {} // Inject MatDialog

  deletedProducts = [
    { 
      id: 1,
      imagePath: 'https://shop2banh.vn/images/thumbs/2022/07/dia-kingspeed-260mm-mau-moi-4-lo-1860-slide-products-62ce51d3a941b.jpg',
      name: 'Đĩa KingSpeed 260mm mẫu mới 4 lỗ',
      category: 'Đĩa xe máy',
      price: 2500000,
      discount: 2200000,
      deletedAt: new Date('2025-03-10')
    },
    { 
      id: 2,
      imagePath: 'https://shop2banh.vn/images/thumbs/2024/10/phuoc-rcb-flow-pro-cho-vario-click-chinh-hang-2365-slide-products-670784b987c3c.jpg',
      name: 'Phuộc RCB Flow Pro cho Vario, Click chính hãng',
      category: 'Phuộc xe máy',
      price: 500000,
      discount: 450000,
      deletedAt: new Date('2025-03-12')
    },
    { 
      id: 3,
      imagePath: 'https://shop2banh.vn/images/thumbs/2024/10/nhot-liqui-moly-molygen-scooter-5w30-08l-2368-slide-products-66fe088d4c7fb.png',
      name: 'Nhớt Liqui Moly Molygen Scooter 5W30 0.8L',
      category: 'Nhớt xe máy',
      price: 800000,
      discount: 750000,
      stock: 10,
      deletedAt: new Date('2025-03-14')
    }
  ];
// ✅ Hàm mở hộp thoại xác nhận xóa
confirmDelete(product: any) {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '400px',
    data: { message: `Bạn có chắc chắn muốn xóa vĩnh viễn "${product.name}" không?` }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.deleteForever(product);
    }
  });
}
  filteredProducts = [...this.deletedProducts];  // ✅ Thêm dòng này
// ✅ Hàm khôi phục sản phẩm
restoreProduct(product: any) {
  alert(`Khôi phục sản phẩm: ${product.name}`);
}

// ✅ Hàm xóa vĩnh viễn sản phẩm
deleteForever(product: any) {
  if (confirm(`Bạn có chắc muốn xóa vĩnh viễn sản phẩm "${product.name}" không?`)) {
    alert(`Đã xóa vĩnh viễn sản phẩm: ${product.name}`);
  }
}

}


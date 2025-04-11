import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/services/apis/product.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  thumbs: string[] = [];
  reviewImages: string[] = [];
  product: any;
// ❌ Xóa dòng này nếu có
labels: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('🟡 ID lấy từ route:', id);
  
    this.productService.getProductById(id).subscribe({
      next: (res) => {
        console.log('🟢 Product detail:', res);
        this.product = res.data; // ✅ sửa ở đây
        // 👇 nếu backend chỉ trả tên ảnh
this.product.image = `http://localhost:3000/uploads/${this.product.image}`;
this.thumbs = [this.product.image];
      },
      error: (err) => {
        console.error('❌ Lỗi khi lấy chi tiết sản phẩm:', err);
      }
    });
  }
  addToCart() {

    const product_id = this.product.id;
    const quantity = 1;
    this.productService.addToCart({
      product_id,
      quantity
    }).subscribe({
      next: () => alert("🛒 Đã thêm vào giỏ hàng!"),
      error: err => console.error("❌ Lỗi:", err)
    });
    
  }
  
}


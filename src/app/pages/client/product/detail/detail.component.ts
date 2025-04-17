import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ THÊM FormsModule
import { ProductService } from 'src/app/services/apis/product.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ToastComponent } from 'src/app/components/shared/custom-toast/custom-toast.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastComponent], // ✅ THÊM FormsModule
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  thumbs: string[] = [];
  reviewImages: string[] = [];
  product: any;
  labels: string[] = [];

  quantity = 1; // ✅ dùng để tăng/giảm số lượng

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService // ✅ thêm
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
  
    this.productService.getClientProductById(id).subscribe({
      next: (res) => {
        this.product = res?.data || res; // 👈 Nếu API không bọc trong `{ data }` thì dùng `res` luôn
  
        if (!this.product) {
          console.error('❌ Không có dữ liệu sản phẩm');
          return;
        }
  
        this.product.image = `http://localhost:3000/uploads/${this.product.image}`;
        this.thumbs = [this.product.image];
      },
      error: (err) => {
        console.error('❌ Lỗi khi lấy chi tiết sản phẩm:', err);
      }
    });
  }
  

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  toastVisible = false;

addToCart() {
  const product_id = this.product.id;
  this.productService.addToCart({ product_id, quantity: this.quantity }).subscribe({
    next: () => {
      this.toastVisible = true;
      setTimeout(() => this.toastVisible = false, 3000);
    },
    error: err => console.error("❌ Lỗi:", err)
  });
}

  
  
}

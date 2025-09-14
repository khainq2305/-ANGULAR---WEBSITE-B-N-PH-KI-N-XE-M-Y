import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/services/apis/product.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ToastComponent } from 'src/app/components/shared/custom-toast/custom-toast.component';
import { enviroment } from 'src/environments/environment';
import { CartService } from 'src/app/services/apis/cart.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  thumbs: string[] = [];
  reviewImages: string[] = [];
  product: any;
  labels: string[] = [];
  quantity = 1;
  toastVisible = false;
  errorMessage: string = '';
  totalInCart: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getClientProductById(id).subscribe({
      next: (res) => {
        this.product = res?.data || res;

        this.product.image = `${enviroment.apiUrl}/uploads/${this.product.image}`;

        this.product.finalPrice = this.product.price - this.product.discount;

        this.thumbs = [this.product.image];

        const user = JSON.parse(localStorage.getItem('user') || '{}');

        if (user?.id) {
          this.cartService.getCartByUser(user.id).subscribe((cartRes: any) => {
            const items = cartRes.data || [];

            const productInCart = items.find(
              (item: any) => item.product_id === this.product.id
            );

            this.totalInCart += this.quantity;
          });
        }
      },
    });
  }

  increaseQuantity() {
    const maxAddable = this.product?.quantity - this.totalInCart;

    if (maxAddable <= 0) {
      this.errorMessage = `Bạn đã thêm đủ số lượng sản phẩm tối đa (${this.product.quantity}).`;
      return;
    }

    if (this.quantity < maxAddable) {
      this.quantity++;
      this.errorMessage = '';
    } else {
      this.errorMessage = `Bạn chỉ có thể thêm tối đa ${maxAddable} sản phẩm nữa.`;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.errorMessage = '';
    }
  }

  onImageError(event: any) {
    event.target.src =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5-I3nwE8w_QXqUKIaA9R5Rjr-l7UOVLdPWQ&s';
  }

  addToCart() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.toastr.warning('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');

      window.location.href = '/dang-nhap';
      return;
    }

    const maxAddable = this.product.quantity - this.totalInCart;

    if (this.quantity > maxAddable) {
      this.errorMessage = `Bạn chỉ có thể thêm tối đa ${maxAddable} sản phẩm nữa.`;
      return;
    }

    const product_id = this.product.id;

    this.productService
      .addToCart({ product_id, quantity: this.quantity })
      .subscribe({
        next: () => {
          this.toastVisible = true;

          this.errorMessage = '';

          const user = JSON.parse(localStorage.getItem('user') || '{}');

          if (user?.id) {
            this.cartService
              .getCartByUser(user.id)
              .subscribe((cartRes: any) => {
                const items = cartRes.data || [];

                const productInCart = items.find(
                  (item: any) => item.product_id === this.product.id
                );

                this.totalInCart = productInCart?.quantity || 0;

                this.cartService.setCartItems(items);
              });
          }

          setTimeout(() => (this.toastVisible = false), 3000);
        },

        error: (err) => {
          this.errorMessage =
            err.error?.message || 'Thêm vào giỏ hàng thất bại';
          console.error('❌ Lỗi thêm giỏ hàng:', err);
        },
      });
  }
}

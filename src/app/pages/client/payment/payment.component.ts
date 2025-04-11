import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/apis/cart.service';
import { ICartItem } from '../../../interface/cart.interface';
import { CommonModule } from '@angular/common';
@Component({
  imports: [
    CommonModule, // ✅ Thêm dòng này
  
  ],
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  cartItems: ICartItem[] = [];
  totalAmount = 0;
  shippingFee = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const idUser = 120; // Lấy từ localStorage/token sau
    this.cartService.getCartByUser(idUser).subscribe({
      next: (res) => {
        this.cartItems = res.data;
        this.calculateTotal();
      },
      error: (err) => {
        console.error('❌ Lỗi khi load giỏ hàng:', err);
      }
    });
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce(
      (sum, item) => sum + (item.finalPrice || 0) * item.quantity,
      0
    );
    
    
  }
}

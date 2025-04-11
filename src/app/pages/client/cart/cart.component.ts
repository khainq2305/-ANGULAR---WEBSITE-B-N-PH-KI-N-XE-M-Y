// src/app/pages/client/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../services/apis/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  selectAll = false;
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const idUser = 120; // ✅ Lấy từ token hoặc localStorage
    this.cartService.getCartByUser(idUser).subscribe({
      next: (res) => {
        console.log('🟡 Dữ liệu giỏ hàng trả về:', res.data); // 👈 THÊM DÒNG NÀY
        this.cartItems = res.data.map((item: any) => ({
          ...item, // giữ nguyên cart (id, quantity, idUser, ...)
          selected: false,
          variant: 'Mặc định' // nếu có biến thể thì thay đổi
        }));
        
        
      },
      error: (err) => {
        console.error('❌ Lỗi khi load giỏ hàng:', err);
      }
    });
  }

  get totalAmount(): number {
    return this.cartItems
      .filter(item => item.selected)
      .reduce((sum, item) => sum + item.product.finalPrice * item.quantity, 0);
  }
  
  toggleSelectAll() {
    this.cartItems.forEach(item => (item.selected = this.selectAll));
  }
  increaseQuantity(item: any) {
    item.quantity++;
  }
  
  decreaseQuantity(item: any) {
    if (item.quantity > 1) item.quantity--;
  }
  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
  }

  deleteSelectedItems() {
    this.cartItems = this.cartItems.filter(item => !item.selected);
  }
}

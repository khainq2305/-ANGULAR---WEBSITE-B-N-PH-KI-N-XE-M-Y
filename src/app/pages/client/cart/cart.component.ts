// src/app/pages/client/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../services/apis/cart.service';
import { ICartItem } from 'src/app/interface/cart.interface';
import { jwtDecode } from 'jwt-decode';


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
    const token = localStorage.getItem('token');
    if (!token) return;
  
    const decoded: any = jwtDecode(token);
    const idUser = decoded.id; // 👈 đây là idUser từ token
  
    this.cartService.getCartByUser(idUser).subscribe({
      next: (res: { data: ICartItem[] }) => {
        console.log('🟡 Cart items:', res.data);
  
        this.cartItems = res.data.reduce((acc: any[], curr: ICartItem) => {
          const found = acc.find(item => item.product?.id === curr.product?.id);
          if (found) {
            found.quantity += curr.quantity;
          } else {
            acc.push({ ...curr, selected: false, variant: 'Mặc định' });
          }
          return acc;
        }, []);
      },
      error: (err) => console.error('❌ Lỗi khi load giỏ hàng:', err)
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
  goToCheckout() {
    const selectedItems = this.cartItems.filter(item => item.selected);
    localStorage.setItem('selectedCartItems', JSON.stringify(selectedItems));
  }
  
  deleteSelectedItems() {
    this.cartItems = this.cartItems.filter(item => !item.selected);
  }
}

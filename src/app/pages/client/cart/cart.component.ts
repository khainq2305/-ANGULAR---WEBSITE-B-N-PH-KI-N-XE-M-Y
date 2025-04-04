import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // 👈 Quan trọng để dùng [(ngModel)]

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // 👈 Thêm cả FormsModule
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  selectAll = false;

  cartItems = [
    {
      id: 1,
      name: 'Sample Product Name',
      image: '/uploads/sample.jpg',
      variant: 'Size M',
      oldPrice: 300000,
      newPrice: 270000,
      discount: '-10%',
      quantity: 1,
      selected: false,
    },
    {
      id: 2,
      name: 'Product 2',
      image: '/uploads/sample.jpg',
      variant: 'Size L',
      oldPrice: 500000,
      newPrice: 450000,
      discount: '-10%',
      quantity: 2,
      selected: false,
    },
  ];

  get totalAmount(): number {
    return this.cartItems
      .filter(item => item.selected)
      .reduce((sum, item) => sum + item.newPrice * item.quantity, 0);
  }

  toggleSelectAll() {
    this.cartItems.forEach(item => (item.selected = this.selectAll));
  }

  deleteSelectedItems() {
    this.cartItems = this.cartItems.filter(item => !item.selected);
  }
}

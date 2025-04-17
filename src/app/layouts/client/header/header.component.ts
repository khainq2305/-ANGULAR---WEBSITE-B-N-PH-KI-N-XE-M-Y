
import { RouterLink, RouterModule } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { CartService } from '../../../services/apis/cart.service';
import { ICartItem } from 'src/app/interface/cart.interface';
// ✅ Import component đã tách riêng
import { SearchOverlayComponent } from '../../../components/search-overlay/search-overlay.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    NgIf,
    CommonModule,
    SearchOverlayComponent // ✅ sử dụng component mới
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  openSearch = false;
  isLoggedIn = false;
  userEmail = '';
  userAvatar = '';
  cartItems: ICartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const userId = Number(localStorage.getItem('id')); // 👈 Đảm bảo có id user

    this.isLoggedIn = !!token;
    if (this.isLoggedIn && email) {
      this.userEmail = email.split('@')[0];
    }

    if (this.isLoggedIn && userId) {
      this.cartService.getCartByUser(userId).subscribe({
        next: (res) => {
          this.cartItems = res.data.map(item => ({
            ...item,
            image: item.product?.image?.startsWith('http') ? item.product.image : `http://localhost:3000/uploads/${item.product?.image}`,
            name: item.product?.name,
            price: item.product?.finalPrice || item.product?.price,
          }));
        },
        error: () => {
          console.error('Không lấy được giỏ hàng');
        }
      });
    }
  }

  toggleSearch() {
    this.openSearch = !this.openSearch;
    document.body.classList.toggle('modal-open', this.openSearch);
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }
}
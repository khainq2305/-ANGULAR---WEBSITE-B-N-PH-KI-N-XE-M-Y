import { RouterLink, RouterModule } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/apis/cart.service';
import { ICartItem } from 'src/app/interface/cart.interface';
import { SearchOverlayComponent } from '../../../components/search-overlay/search-overlay.component';
import { ProductService } from 'src/app/services/apis/product.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    NgIf,
    CommonModule,
    SearchOverlayComponent
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

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}
  async ngOnInit(): Promise<void> {
    console.log('👉 HeaderComponent ngOnInit chạy');
  
    const token = localStorage.getItem('token');
    const userId = Number(localStorage.getItem('id'));
  
    console.log('🧾 Token:', token);

    const email = localStorage.getItem('email');


    this.isLoggedIn = !!token;

    if (this.isLoggedIn && email) {
      this.userEmail = email.split('@')[0];
    }

    if (this.isLoggedIn && userId) {
      try {
        const res = await this.cartService.getCartByUser(userId).toPromise();
     
console.log('🛒 Kết quả từ getCartByUser:', res);

        if (!res?.data) return;
        
        const rawItems = res.data;
        const itemWithProduct = await Promise.all(
          rawItems.map(async (item: any) => {
            try {
              const productRes = await this.productService.getProductById(item.product_id).toPromise();
              const product = productRes?.data;
              if (!product) return null;
        
              return {
                ...item,
                product: {
                  ...product,
                  finalPrice: product.discount > 0 ? product.price - product.discount : product.price,
                  image: product.image?.startsWith('http')
                    ? product.image
                    : `http://localhost:3001/uploads/${product.image}`
                }
              };
            } catch (err) {
              console.error('Lỗi lấy sản phẩm:', item.product_id, err);
              return null;
            }
          })
        );
        
        this.cartItems = itemWithProduct.filter(p => p !== null);
        
    
        this.cartItems = itemWithProduct;
        console.log('🛒 Sau khi map:', this.cartItems);
        
        console.log('✅ Mini-cart items:', this.cartItems);
        this.cdr.detectChanges();
      } catch (err) {
        console.error('❌ Lỗi khi load giỏ hàng nhỏ:', err);
      }
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

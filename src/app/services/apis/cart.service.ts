import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../../services/common/api.service';
import { API_ENDPOINT } from '../../config/api-endpoint.config';
import { ICartItem } from 'src/app/interface/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<ICartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable(); // để component subscribe

  constructor(private api: ApiService) {}

  // 🛒 Lấy giỏ hàng theo ID người dùng
  getCartByUser(idUser: number): Observable<{ data: ICartItem[] }> {
    return this.api.get(`${API_ENDPOINT.cart.base}${API_ENDPOINT.cart.getByUser}`, [idUser]);
  }

  // ✅ Gọi cái này để cập nhật lại header mini-cart
  setCartItems(items: ICartItem[]) {
    this.cartItemsSubject.next(items);
  }

  deleteCartItem(id: number): Observable<any> {
    return this.api.delete(`${API_ENDPOINT.cart.base}/remove`, [id]); // /remove/:id
  }

  deleteMultipleItems(ids: number[]): Observable<any> {
    return this.api.post(`${API_ENDPOINT.cart.base}/delete-multiple`, { ids });
  }
}

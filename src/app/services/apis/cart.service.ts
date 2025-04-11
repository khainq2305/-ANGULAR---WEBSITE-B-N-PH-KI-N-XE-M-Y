// src/app/services/apis/client/cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from '.././../config/api-endpoint.config';
import { ICartItem } from 'src/app/interface/cart.interface'; // ✅ import interface
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCartByUser(idUser: number): Observable<{ data: ICartItem[] }> {
    return this.http.get<{ data: ICartItem[] }>(
      `${API_ENDPOINT.cart.base}${API_ENDPOINT.cart.getByUser}/${idUser}`
    );
  }
  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from '../../config/api-endpoint.config';
import { Observable } from 'rxjs';
import { enviroment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders(params: any = {}): Observable<any> {
    return this.http.get(API_ENDPOINT.order.base + API_ENDPOINT.order.list, {
      params
    });
  }
  
  
  getOrderById(id: number): Observable<any> {
    return this.http.get(`${API_ENDPOINT.order.base}/${id}`);
  }
  cancelOrder(orderId: number, reason: string): Observable<any> {
    return this.http.put(`${API_ENDPOINT.order.base}/${orderId}/cancel`, { reason });
  }
  
  updateStatus(orderId: number, status: number): Observable<any> {
    return this.http.put(`${API_ENDPOINT.order.base}/${orderId}/update-status`, { status });
  }
  
 
}

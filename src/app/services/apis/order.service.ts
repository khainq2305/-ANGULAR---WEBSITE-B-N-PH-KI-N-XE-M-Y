import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '../../config/api-endpoint.config';
import { ApiService } from '../common/api.service'; 

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private api: ApiService) {} // ✅ inject ApiService

  getOrders(params: any = {}): Observable<any> {
    return this.api.get(`${API_ENDPOINT.order.base}${API_ENDPOINT.order.list}`, [], undefined, params);
  }

  getOrderById(id: number): Observable<any> {
    return this.api.get(`${API_ENDPOINT.order.base}`, [id]);
  }

  cancelOrder(orderId: number, reason: string): Observable<any> {
    return this.api.put(`${API_ENDPOINT.order.base}/${orderId}/cancel`, { reason });
  }

  updateStatus(orderId: number, status: number): Observable<any> {
    return this.api.put(`${API_ENDPOINT.order.base}/${orderId}/update-status`, { status });
  }
  getOrdersByUser(params: any ={}): Observable<any> {
    return this.api.get(`${API_ENDPOINT.orderClient.base}${API_ENDPOINT.orderClient.getByUser}`, [], undefined, params);
  }
  
}

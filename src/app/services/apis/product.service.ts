import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../../interface/product.interface';
import { API_ENDPOINT } from '../../config/api-endpoint.config';
import { ApiService } from '../../services/common/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient, private api: ApiService) {} // KHÔNG kế thừa ApiService nữa

  getProductList(filters: any = {}): Observable<any> {
    return this.http.get(`${API_ENDPOINT.product.base}${API_ENDPOINT.product.list}`, {
      params: filters
    });
  }
  getProductById(id: number): Observable<any> {
    return this.http.get(`${API_ENDPOINT.product.base}/${id}`);
  }
  
  updateProduct(id: number, data: FormData): Observable<any> {
    return this.http.put(`${API_ENDPOINT.product.base}/${id}`, data);
  }
  
  deleteMultipleProducts(ids: number[]): Observable<any> {
    return this.http.delete(
      `${API_ENDPOINT.product.base}${API_ENDPOINT.product.deleteMultiple}`,
      { body: { ids } }
    );
    
  }
  
  createProduct(formData: FormData): Observable<any> {
    console.log("📤 Sending FormData...", formData); // ✅ Log formData để chắc chắn
    return this.http.post(
      API_ENDPOINT.product.base + API_ENDPOINT.product.add,
      formData
    );
  }
  
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${API_ENDPOINT.product.base}/${id}`);
  }
  
  restoreProduct(id: number): Observable<any> {
    return this.http.patch(`${API_ENDPOINT.product.base}/restore/${id}`, {});
  }
  
  // Xóa vĩnh viễn 1 sản phẩm
permanentDeleteProduct(id: number): Observable<any> {
  return this.http.delete(`${API_ENDPOINT.product.base}/permanent/${id}`);
}

// Xóa vĩnh viễn nhiều sản phẩm
permanentDeleteMultipleProducts(ids: number[]): Observable<any> {
  return this.http.delete(`${API_ENDPOINT.product.base}/permanent-delete-multiple`, {
    body: { ids }
  });
}
// ✅ Khôi phục nhiều sản phẩm
restoreMultipleProducts(ids: number[]): Observable<any> {
  return this.http.patch(
    `${API_ENDPOINT.product.base}/restore-multiple`,
    { ids }
  );
}
addToCart(data: { product_id: number; quantity: number }): Observable<any> {
  return this.api.post(`${API_ENDPOINT.cart.base}${API_ENDPOINT.cart.add}`, data);

}

}

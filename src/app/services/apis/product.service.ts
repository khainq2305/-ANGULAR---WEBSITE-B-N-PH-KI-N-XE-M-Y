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
  constructor(private http: HttpClient, private api: ApiService) {}

  // 🔍 ADMIN - Lấy danh sách sản phẩm có filter
  getProductList(filters: any = {}): Observable<any> {
    return this.api.get(`${API_ENDPOINT.product.base}${API_ENDPOINT.product.list}`, [], undefined, filters);
  }

  // 🔍 ADMIN - Lấy sản phẩm theo ID
  getProductById(id: number): Observable<any> {
    return this.api.get(`${API_ENDPOINT.product.base}`, [id]);
  }

  // ✏️ ADMIN - Cập nhật sản phẩm (dùng FormData nên giữ nguyên http)
  updateProduct(id: number, data: FormData): Observable<any> {
    return this.http.put(`${API_ENDPOINT.product.base}/${id}`, data);
  }

  // ❌ ADMIN - Xóa nhiều sản phẩm
  deleteMultipleProducts(ids: number[]): Observable<any> {
    return this.api.delete(`${API_ENDPOINT.product.base}${API_ENDPOINT.product.deleteMultiple}`, [], undefined, { ids });
  }

  // ➕ ADMIN - Tạo sản phẩm (dùng FormData nên giữ nguyên http)
  createProduct(formData: FormData): Observable<any> {
    console.log("📤 Sending FormData...", formData);
    return this.http.post(API_ENDPOINT.product.base + API_ENDPOINT.product.add, formData);
  }

  // ❌ ADMIN - Xóa 1 sản phẩm
  deleteProduct(id: number): Observable<any> {
    return this.api.delete(`${API_ENDPOINT.product.base}`, [id]);
  }

  // 🔄 ADMIN - Khôi phục 1 sản phẩm
  restoreProduct(id: number): Observable<any> {
    return this.api.patch(`${API_ENDPOINT.product.base}/restore/${id}`, {});
  }

  // ❌ ADMIN - Xóa vĩnh viễn 1 sản phẩm
  permanentDeleteProduct(id: number): Observable<any> {
    return this.api.delete(`${API_ENDPOINT.product.base}/permanent`, [id]);
  }

  // ❌ ADMIN - Xóa vĩnh viễn nhiều sản phẩm
  permanentDeleteMultipleProducts(ids: number[]): Observable<any> {
    return this.api.delete(`${API_ENDPOINT.product.base}/permanent-delete-multiple`, [], undefined, { ids });
  }

  // 🔄 ADMIN - Khôi phục nhiều sản phẩm
  restoreMultipleProducts(ids: number[]): Observable<any> {
    return this.api.patch(`${API_ENDPOINT.product.base}/restore-multiple`, { ids });
  }

  // 🛒 CLIENT - Thêm sản phẩm vào giỏ
  addToCart(data: { product_id: number; quantity: number }): Observable<any> {
    return this.api.post(`${API_ENDPOINT.cart.base}${API_ENDPOINT.cart.add}`, data);
  }

  // 📦 CLIENT - Lấy danh sách sản phẩm
  getClientProducts(): Observable<IProduct[]> {
    return this.api.get<IProduct[]>(`${API_ENDPOINT.productClient.base}`);
  }

  // 📦 CLIENT - Lấy sản phẩm có lọc
  getClientProductsWithFilter(filters: any = {}): Observable<IProduct[]> {
    return this.api.get<IProduct[]>(`${API_ENDPOINT.productClient.base}`, [], undefined, filters);
  }

  // 🌟 CLIENT - Lấy sản phẩm nổi bật
  getFeaturedProducts(): Observable<IProduct[]> {
    const url = `${API_ENDPOINT.productClient.base}${API_ENDPOINT.productClient.featured}`;
    console.log('🔥 URL gọi:', url); // ✅ Xem kết quả thật
    return this.api.get<IProduct[]>(url);
  }
  getClientProductById(id: number): Observable<any> {
    return this.api.get(`${API_ENDPOINT.productClient.base}`, [id]);
  }
  // 🔍 ADMIN - Lấy danh mục có status = 1 để filter
getActiveCategories(): Observable<any> {
  return this.api.get(`${API_ENDPOINT.product.base}/active-categories`);
}

}

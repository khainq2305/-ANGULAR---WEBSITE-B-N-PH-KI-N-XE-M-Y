import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  /**
   * GET: Lấy dữ liệu có thể kèm tham số URL và query params
   */
  get<T>(
    apiUrl: string,
    parameter: any[] = [],
    customHeaders?: HttpHeaders,
    queryParams?: any
  ): Observable<T> {
    parameter.forEach((p) => {
      apiUrl += '/' + p;
    });

    return this.http.get<T>(apiUrl, {
      headers: customHeaders ?? this.getHeaders(),
      params: queryParams,
    });
  }

  /**
   * POST: Gửi dữ liệu body dạng JSON
   */
  post<T>(
    apiUrl: string,
    body?: T,
    customHeaders?: HttpHeaders
  ): Observable<T> {
    return this.http.post<T>(
      apiUrl,
      body ? JSON.stringify(body) : {},
      { headers: customHeaders ?? this.getHeaders() }
    );
  }

  /**
   * PATCH: Cập nhật một phần dữ liệu
   */
  patch<T>(
    apiUrl: string,
    body?: T,
    customHeaders?: HttpHeaders
  ): Observable<T> {
    return this.http.patch<T>(
      apiUrl,
      body ? JSON.stringify(body) : {},
      { headers: customHeaders ?? this.getHeaders() }
    );
  }

  /**
   * PUT: Gửi dữ liệu đầy đủ (thay thế toàn bộ)
   */
  put<T>(
    apiUrl: string,
    body?: T,
    customHeaders?: HttpHeaders
  ): Observable<T> {
    return this.http.put<T>(
      apiUrl,
      body ? JSON.stringify(body) : {},
      { headers: customHeaders ?? this.getHeaders() }
    );
  }

  /**
   * DELETE: Cho phép truyền param hoặc body (ví dụ xóa nhiều)
   */
  delete(
    apiUrl: string,
    parameter: any[] = [],
    customHeaders?: HttpHeaders,
    body?: any
  ): Observable<any> {
    parameter.forEach((p: string) => {
      apiUrl += '/' + p;
    });

    return this.http.request('delete', apiUrl, {
      headers: customHeaders ?? this.getHeaders(),
      body: body,
    });
  }

  /**
   * Tạo headers mặc định
   */
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.getToken() ?? '',
    });
  }

  /**
   * Lấy token từ localStorage
   */
  getToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }
}

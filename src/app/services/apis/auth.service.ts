import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '../../config/api-endpoint.config'; // ✅ Đảm bảo file này có client.user

@Injectable({
  providedIn: 'root'
})
export class ClientUserService {
  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(
      `${API_ENDPOINT.auth.base}${API_ENDPOINT.auth.register}`,
      data
    );
  }

  login(data: any): Observable<any> {
    return this.http.post(
      `${API_ENDPOINT.auth.base}${API_ENDPOINT.auth.login}`,
      data
    );
  }
  getUserId(): number | null {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user?.id || null;
  }
  
  
}

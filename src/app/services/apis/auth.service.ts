import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '../../config/api-endpoint.config';
import { ApiService } from '../common/api.service'; // ✅ Import service custom này

@Injectable({
  providedIn: 'root'
})
export class ClientUserService {
  constructor(private api: ApiService) {}

  register(data: any): Observable<any> {
    return this.api.post(
      `${API_ENDPOINT.auth.base}${API_ENDPOINT.auth.register}`,
      data
    );
  }

  login(data: any): Observable<any> {
    return this.api.post(
      `${API_ENDPOINT.auth.base}${API_ENDPOINT.auth.login}`,
      data
    );
  }

  getUserId() {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('User data là:', userData);  // Kiểm tra dữ liệu user trong localStorage
    return userData.id || null;
  }  
}

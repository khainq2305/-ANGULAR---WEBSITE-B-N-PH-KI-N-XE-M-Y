// src/app/services/apis/user.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';
import { User } from 'src/app/interface/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  private endpoint = API_ENDPOINT.user;

  constructor(private http: HttpClient) {}

  getUsers(params?: any): Observable<{ success: boolean; data: User[]; totalPages: number }> {
    return this.http.get<{ success: boolean; data: User[]; totalPages: number }>(
      this.endpoint.base + this.endpoint.list,
      { params }
    );
  }
  
  
  createUser(data: FormData): Observable<any> {
    return this.http.post<any>(this.endpoint.base + this.endpoint.add, data);
  }

  updateUser(id: number | string, data: Partial<User>): Observable<any> {
    return this.http.put(this.endpoint.base + this.endpoint.edit(id), data);
  }

  deleteUser(id: number | string): Observable<any> {
    return this.http.delete(this.endpoint.base + this.endpoint.delete(id));
  }

  toggleStatus(id: number | string): Observable<any> {
    return this.http.patch(this.endpoint.base + this.endpoint.toggleStatus(id), {});
  }

  updateUserStatus(id: number | string, status: number): Observable<any> {
    return this.http.patch(this.endpoint.base + this.endpoint.toggleStatus(id), { status });
  }

  resetPassword(id: number | string): Observable<{ success: boolean; password: string }> {
    return this.http.patch<{ success: boolean; password: string }>(
      `${this.endpoint.base}/admin/user/${id}/reset-password`, {}
    );
  }
  
}

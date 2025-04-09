// src/app/services/apis/user.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:3000/admin/user';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createUser(data: FormData) {
    return this.http.post<any>('http://localhost:3000/admin/user', data);
  }
  



  toggleStatus(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/status`, {});
  }

  updateUserStatus(id: number, status: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/status`, { status });
  }
  resetPassword(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/reset-password`, {});
  }
  
}

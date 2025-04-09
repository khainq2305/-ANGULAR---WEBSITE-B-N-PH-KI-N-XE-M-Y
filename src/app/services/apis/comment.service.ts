import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private apiUrl = 'http://localhost:3000/admin/comment'; 

  constructor(private http: HttpClient) {}

  // Lấy danh sách bình luận theo sản phẩm
  getCommentsByProduct(productId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/product/${productId}`);
  }

  // Lấy tất cả bình luận (tổng hợp để hiển thị danh sách sản phẩm có comment)
  getSummary(): Observable<any> {
    return this.http.get(`${this.apiUrl}/summary`);
  }

  // Xoá bình luận
  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${commentId}`);
  }

  // Thêm bình luận mới (nếu cần dùng cho khách hàng bình luận)
  addComment(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Trả lời bình luận
  replyToComment(commentId: number, reply: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${commentId}/reply`, { reply });
  }

  // Cập nhật nội dung bình luận
  updateComment(commentId: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${commentId}`, data);
  }
}

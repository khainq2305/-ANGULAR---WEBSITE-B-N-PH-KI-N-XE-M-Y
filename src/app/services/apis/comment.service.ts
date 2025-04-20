import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';
import { Comment, ProductCommentSummary } from 'src/app/interface/comment.interface';

@Injectable({ providedIn: 'root' })
export class CommentService {
  constructor(private http: HttpClient) {}

  getCommentsByProduct(productId: number, page: number, limit: number): Observable<{
    success: boolean;
    productName: string;
    comments: Comment[];
    totalComments: number;
    currentPage: number;
    totalPages: number;
    message?: string;
  }> {
    const url = API_ENDPOINT.comment.byProduct(productId, page, limit);
    console.log('getCommentsByProduct called:', { productId, page, limit, url });
    return this.http.get<{
      success: boolean;
      productName: string;
      comments: Comment[];
      totalComments: number;
      currentPage: number;
      totalPages: number;
      message?: string;
    }>(url);
  }

  getSummary(): Observable<{ data: ProductCommentSummary[] }> {
    return this.http.get<{ data: ProductCommentSummary[] }>(
      API_ENDPOINT.comment.base + API_ENDPOINT.comment.summary
    );
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(API_ENDPOINT.comment.delete(commentId));
  }

  addComment(data: Partial<Comment>): Observable<any> {
    return this.http.post(API_ENDPOINT.comment.create, data);
  }

  editComment(commentId: number, data: Partial<Comment>): Observable<any> {
    return this.http.put(API_ENDPOINT.comment.update(commentId), data);
  }

  checkUserComment(userId: number, productId: number): Observable<any> {
    return this.http.get(API_ENDPOINT.comment.getCommentByUser(userId, productId));
  }

  replyToComment(commentId: number, reply: string): Observable<any> {
    return this.http.post(API_ENDPOINT.comment.reply(commentId), { reply });
  }

  updateComment(commentId: number, data: Partial<Comment>): Observable<any> {
    return this.http.put(API_ENDPOINT.comment.update(commentId), data);
  }
}

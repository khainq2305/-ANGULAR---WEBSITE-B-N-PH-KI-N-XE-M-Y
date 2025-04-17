import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReview } from '../../interface/review.interface';
import { API_ENDPOINT } from '../../config/api-endpoint.config';
import { ApiService } from '../common/api.service';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  constructor(private api: ApiService) {}

  createReview(data: IReview): Observable<any> {
    return this.api.post(`${API_ENDPOINT.review.base}${API_ENDPOINT.review.create}`, data);
  }
  
  getReviewsByProduct(productId: number): Observable<any> {
    return this.api.get(API_ENDPOINT.review.base + API_ENDPOINT.review.getByProduct(productId));
  }
}

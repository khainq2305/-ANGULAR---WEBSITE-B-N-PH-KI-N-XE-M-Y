export interface IReview {
    idComment?: number;
    userId?: number;
    product_id: number;
    rating: number;
    content: string;
    createdAt?: Date;
  }
  
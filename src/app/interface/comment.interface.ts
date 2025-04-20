export interface Comment {
    id: number;
    userId: number;
    productId: number;
    rating: number;
    content: string;
    reply?: string;
    createdAt: string;
    updatedAt: string;
    user?: {
      name: string;
      avatar?: string;
    };
    productName?: string;
    replyDate?: string;

  }
  
  export interface ProductCommentSummary {
    productId: number;
    productName: string;
    imageUrl: string;
    totalComments: number;
    avgRating: number;
  }
  
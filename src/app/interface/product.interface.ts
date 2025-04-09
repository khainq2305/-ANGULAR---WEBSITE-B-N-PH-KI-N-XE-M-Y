export interface IProduct {
    id: number;
    name: string;
    price: number;
    quantity: number;
    discount?: number;
    status: number;
    image: string;
    idCategory: number;
    createdAt?: string; // 👈 Thêm dòng này
    is_feature?: boolean;
     // 👇 Thêm dòng này để fix lỗi checkbox
  selected?: boolean;
    category?: {
      id: number;
      name: string;
    };
  }
  
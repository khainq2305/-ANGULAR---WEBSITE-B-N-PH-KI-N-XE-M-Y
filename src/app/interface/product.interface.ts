export interface IProduct {
  id: number;
  name: string;
  price: number;
  discount: number;         // ✅ GIỮ
  quantity: number;
  
  status: number;
  image: string;
  idCategory: number;
  createdAt?: string;
  is_feature?: boolean;
  selected?: boolean;
  category?: {
    id: number;
    name: string;
  };
}

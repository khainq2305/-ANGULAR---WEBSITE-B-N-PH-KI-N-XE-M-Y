export interface IProduct {
  id: number;
  name: string;
  price: number;
  final_price: number; // ✅ dùng snake_case giống backend
  quantity: number;
  discount_type: 'none' | 'percentage' | 'fixed';
  discount_value: number;
  
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

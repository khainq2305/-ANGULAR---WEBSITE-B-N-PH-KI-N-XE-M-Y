export interface IProduct {
  id: number;
  name: string;
  price: number;
  discount: number;        
  quantity: number;
    imageError?: boolean; // ✅ thêm dòng này
  status: number;
  image: string;
  idCategory: number;
  createdAt?: string;
  is_feature?: boolean;
  selected?: boolean;
  finalPrice?: number; 
  category?: {
    id: number;
    name: string;
  };
}

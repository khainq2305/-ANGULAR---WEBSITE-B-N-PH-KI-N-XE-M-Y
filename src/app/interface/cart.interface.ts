import { IProduct } from './product.interface';

export interface ICartItem {
  id: number;
  idUser: number;
  product_id: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  finalPrice?: number; // 👈 rất quan trọng khi hiển thị ra
  price?: number;        // ✅ Giá gốc
 
  // Gắn thêm thông tin sản phẩm từ bảng products (khi dùng include)
  product?: IProduct;
}

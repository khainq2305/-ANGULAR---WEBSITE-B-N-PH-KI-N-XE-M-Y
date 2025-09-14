
import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router'; 
import { CartService } from '../../../services/apis/cart.service'; 
import { ICartItem } from 'src/app/interface/cart.interface'; 
import { jwtDecode } from 'jwt-decode'; 

import { ToastrService } from 'ngx-toastr'; 
import { enviroment } from 'src/environments/environment'; 

@Component({
  selector: 'app-cart', 
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule], 
  templateUrl: './cart.component.html', 
  styleUrls: ['./cart.component.scss'], 
})
export class CartComponent implements OnInit {
  selectAll = false; 
  cartItems: any[] = []; 





  constructor(
    private cartService: CartService,
    private toastr: ToastrService 
  ) {}

  ngOnInit(): void {
    
    const token = localStorage.getItem('token');

 
    if (!token) return;


    const decoded: any = jwtDecode(token);
    const idUser = decoded.id; 

    
    this.cartService.getCartByUser(idUser).subscribe({
  
      next: (res: { data: ICartItem[] }) => {
        
        this.cartItems = res.data.map((item) => {
    
          const imageUrl = item.product?.image?.startsWith('http')
            ? item.product.image
            : `${enviroment.apiUrl}/uploads/${
                item.product?.image ||
          
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5-I3nwE8w_QXqUKIaA9R5Rjr-l7UOVLdPWQ&s'
              }`;

         
          return {
            ...item, 
            selected: false, 
            product: {
              ...item.product, 
              image: imageUrl, 
            },
          };
        });
      },
    
      error: (err) => console.error('Lỗi khi load giỏ hàng:', err),
    });
  }

get totalAmount(): number {
  return this.cartItems 
    .filter((item) => item.selected) 
    .reduce((sum, item) => sum + item.product.finalPrice * item.quantity, 0); 
    
}


toggleSelectAll() {
  this.cartItems.forEach((item) => (item.selected = this.selectAll));
  
}


increaseQuantity(item: any) {
  const maxQuantity = item.product?.quantity || 0; 


  if (item.quantity >= maxQuantity) {
   
    this.toastr.warning(
      `Bạn chỉ có thể mua tối đa ${maxQuantity} sản phẩm này.` 
    );
    return; 
  }

  item.quantity++; 
}


decreaseQuantity(item: any) {
  if (item.quantity > 1) item.quantity--; 

}


removeItem(item: any) {
  this.cartService.deleteCartItem(item.id).subscribe({
    next: () => {
     
      this.cartItems = this.cartItems.filter((i) => i.id !== item.id);
      this.toastr.success('Đã xoá sản phẩm khỏi giỏ hàng'); 
    },
    error: () => {
      this.toastr.error('Không thể xoá sản phẩm'); 
    },
  });
}


get isCheckoutDisabled(): boolean {
  return (
    this.cartItems.length > 0 && 
    this.cartItems.every((item) => !item.selected) 
    
  );
  
}


goToCheckout() {
  const selectedItems = this.cartItems.filter((item) => item.selected);


  if (selectedItems.length === 0) {
   
    this.toastr.error('Vui lòng chọn ít nhất 1 sản phẩm để mua hàng!');
    return;
  }

 
  localStorage.setItem('selectedCartItems', JSON.stringify(selectedItems));
}


deleteSelectedItems() {
 
  const selectedIds = this.cartItems
    .filter((i) => i.selected)
    .map((i) => i.id);


  this.cartService.deleteMultipleItems(selectedIds).subscribe({
    next: () => {
      
      this.cartItems = this.cartItems.filter((i) => !i.selected); 
      this.selectAll = false; 
      this.toastr.success('Đã xoá các sản phẩm được chọn'); 
    },
    error: () => {
      this.toastr.error('Không thể xoá các sản phẩm'); 
    },
  });
}
}

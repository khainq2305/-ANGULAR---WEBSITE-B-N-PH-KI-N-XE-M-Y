// ✅ payment.component.ts (ĐÃ XOÁ finalPrice)
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/apis/cart.service';
import { ShippingService } from '../../../services/apis/shipping.service';
import { ICartItem } from '../../../interface/cart.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from 'src/app/services/apis/product.service';
import { ClientUserService } from '../../../services/apis/auth.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  cartItems: ICartItem[] = [];
  totalAmount = 0;
  shippingFee = 0;
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  detailedAddress = '';
  phone = '';
  name = '';
  selectedProvinceId!: number;
  selectedDistrictId!: number;
  selectedWardCode!: string;

  constructor(
    private cartService: CartService,
    private shippingService: ShippingService,
    private productService: ProductService,
    private authService: ClientUserService
  ) {}

  ngOnInit(): void {
    const selectedRaw = JSON.parse(localStorage.getItem('selectedCartItems') || '[]');
    if (!selectedRaw.length) return;

    const productRequests = selectedRaw.map((item: any) =>
      this.productService.getProductById(item.product_id).toPromise().then((res: any) => {
        const price = res.data.price ?? 0;
        const discount = res.data.discount ?? 0;
        const finalPrice = price - discount;
    
        console.log('✅ FINAL PRICE:', { price, discount, finalPrice });
    
        return {
          ...item,
          product: res.data,
          price,
          finalPrice
        };
      })
    );
    
    
    

    Promise.all(productRequests).then((itemsWithProduct: any[]) => {
      this.cartItems = itemsWithProduct.map((item: any) => {
        return {
          ...item,
          product: {
            ...item.product,
            finalPrice: item.finalPrice  // ✅ Dùng đúng finalPrice đã tính từ trên
          }
        };
      });
      
    
      this.calculateTotal();
    });
    
    
    

    this.shippingService.getProvinces().subscribe({
      next: (res) => this.provinces = res.data,
      error: (err) => console.error('Lỗi tỉnh:', err)
    });
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((sum, item) => {
      const price = item.product?.finalPrice ?? 0;
      return sum + price * item.quantity;
    }, 0);
  }
  
  

  totalWeight(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity * 500, 0);
  }

  onProvinceChange() {
    this.shippingService.getDistricts(this.selectedProvinceId).subscribe({
      next: (res) => {
        this.districts = res.data;
        this.wards = [];
        this.selectedDistrictId = 0;
      }
    });
  }

  onDistrictChange() {
    this.shippingService.getWards(this.selectedDistrictId).subscribe(res => this.wards = res.data);
  }

  onWardChange() {
    const weight = Math.min(this.totalWeight(), 5000);
    this.shippingService.getAvailableServices(this.selectedDistrictId).subscribe({
      next: (res) => {
        const availableServices = res.data;
        const tryFee = (index: number) => {
          if (index >= availableServices.length) return;
          const service = availableServices[index];
          this.shippingService.calculateFee({
            toDistrictId: this.selectedDistrictId,
            serviceId: service.service_id,
            weight,
            wardCode: this.selectedWardCode
          }).subscribe({
            next: (res) => this.shippingFee = res.data.total,
            error: () => tryFee(index + 1)
          });
        };
        tryFee(0);
      }
    });
  }

  onPlaceOrder() {
    const selectedRaw = JSON.parse(localStorage.getItem('selectedCartItems') || '[]');
    if (!selectedRaw.length) {
      alert('Bạn chưa chọn sản phẩm!');
      return;
    }

    const selectedItems = this.cartItems.filter(item =>
      selectedRaw.some((s: any) => s.product_id === item.product?.id)
    );

    const payload = {
      cartItems: selectedItems.map(item => ({
        productId: item.product?.id,
        quantity: item.quantity,
        price: item.product?.finalPrice // ✅ SỬA LẠI Ở ĐÂY
      })),
      
      paymentMethod: 'COD',
      totalPrice: this.totalAmount + this.shippingFee, // ✅ THÊM DÒNG NÀY
      shippingMethod: 'GHN',
      shippingFee: this.shippingFee,
      address: {
        provinceId: this.selectedProvinceId,
        districtId: this.selectedDistrictId,
        wardCode: this.selectedWardCode,
        address_detail: this.detailedAddress,
        phone: this.phone,
        name: this.name
      }
    };

    this.shippingService.placeOrder(payload).subscribe({
      next: () => {
        alert('🎉 Đặt hàng thành công!');
        const allItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        const updatedItems = allItems.filter((item: any) =>
          !selectedRaw.some((s: any) => s.product_id === item.product_id)
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        localStorage.removeItem('selectedCartItems');
        this.cartItems = updatedItems;
        this.calculateTotal();
      },
      error: (err) => console.error('Lỗi đặt hàng:', err)
    });
  }
}

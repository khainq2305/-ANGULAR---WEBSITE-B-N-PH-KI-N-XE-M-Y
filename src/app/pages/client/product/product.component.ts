import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from 'src/app/services/apis/category.service';
import { ProductService } from 'src/app/services/apis/product.service';
import { ICategory } from 'src/app/interface/category.interface';
import { IProduct } from 'src/app/interface/product.interface';
import { enviroment } from 'src/environments/environment';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: IProduct[] = [];
  categories: ICategory[] = [];
  selectedCategoryIds: number[] = [];

  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 20;

  sortOrder: 'asc' | 'desc' = 'desc'; 
  sortDropdownOpen: boolean = false;

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.categoryService.getActiveCategories().subscribe(res => {
      this.categories = res.data; 
    });
  }

  toggleSortDropdown(): void {
    this.sortDropdownOpen = !this.sortDropdownOpen;
  }

  closeSortDropdown(): void {
    this.sortDropdownOpen = false;
  }

  sortProducts(order: 'asc' | 'desc') {
    this.sortOrder = order;
    this.currentPage = 1;
    this.loadProducts();
    this.sortDropdownOpen = false;
  }

  loadProducts(): void {
  const filters: any = {
    page: this.currentPage,
    limit: this.limit,
    sort: this.sortOrder
  };

  if (this.selectedCategoryIds.length > 0) {
    filters.categoryIds = this.selectedCategoryIds.join(',');
  }

  this.productService.getClientProductsWithFilter(filters).subscribe((res: any) => {
    const sampleImages = [
      'https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/00908901_hp_245_g10_a20tfpt_9ce2c339f9.png',
      'https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/i/xiaomi-14-pro-xanh.png',
      'https://cdn2.cellphones.com.vn/358x/media/catalog/product/o/p/oppo-find-n3-flip-den.png',
      'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-15-pro-max.png',
      'https://cdn2.cellphones.com.vn/358x/media/catalog/product/r/e/redmi-note-13-pro-plus.png'
    ];

   this.products = res.data.map((product: IProduct, index: number) => {
  const sampleImages = [
    'https://shop2banh.vn/images/thumbs/2025/04/gu-trung-nhom-gh-racing-products-2442.jpg',
    'https://shop2banh.vn/images/thumbs/2022/10/bao-tay-gu-nhom-x1r-chinh-hang-products-1866.jpg',
    'https://shop2banh.vn/images/thumbs/2023/09/den-led-2-tang-zhipat-cho-wave-a-wave-s-wave-rsx-wave-rs-future-x-products-652.png',
    'https://shop2banh.vn/images/thumbs/2023/02/chan-chong-nghieng-inox-salaya-cho-vario-click-products-1641.jpg',
    'https://shop2banh.vn/images/thumbs/2025/04/phuoc-rcb-c2-den-ty-vang-cho-sirius-jupiter-chinh-hang-products-2432.png',
    'https://shop2banh.vn/images/thumbs/2020/04/loc-gio-luoi-thep-do-danh-cho-shvn-products-1051.jpg'
  ];

  let imageUrl = '';

  if (product.image && product.image.startsWith('http')) {
    imageUrl = product.image;
  } else if (product.image) {
    imageUrl = `${enviroment.apiUrl}/uploads/${product.image}`;
  } else {
    // Nếu không có ảnh → dùng ảnh mặc định theo index
    imageUrl = sampleImages[index % sampleImages.length];
  }

  return {
    ...product,
    image: imageUrl
  };
});


    this.totalPages = res.totalPages;
  });
}

onImageError(product: IProduct, index: number) {
  const fallbackImages = [
    'https://shop2banh.vn/images/thumbs/2025/04/gu-trung-nhom-gh-racing-products-2442.jpg',
    'https://shop2banh.vn/images/thumbs/2022/10/bao-tay-gu-nhom-x1r-chinh-hang-products-1866.jpg',
    'https://shop2banh.vn/images/thumbs/2023/09/den-led-2-tang-zhipat-cho-wave-a-wave-s-wave-rsx-wave-rs-future-x-products-652.png',
    'https://shop2banh.vn/images/thumbs/2023/02/chan-chong-nghieng-inox-salaya-cho-vario-click-products-1641.jpg',
    'https://shop2banh.vn/images/thumbs/2025/04/phuoc-rcb-c2-den-ty-vang-cho-sirius-jupiter-chinh-hang-products-2432.png',
    'https://shop2banh.vn/images/thumbs/2020/04/loc-gio-luoi-thep-do-danh-cho-shvn-products-1051.jpg'
  ];
  product.image = fallbackImages[index % fallbackImages.length];
}

  onCategoryChange(categoryId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedCategoryIds.push(categoryId);
    } else {
      this.selectedCategoryIds = this.selectedCategoryIds.filter(id => id !== categoryId);
    }

    this.currentPage = 1;
    this.loadProducts();
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadProducts();
  }

  showAll: boolean = false;
}

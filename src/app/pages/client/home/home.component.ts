import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from 'src/app/interface/product.interface';
import { ProductService } from 'src/app/services/apis/product.service';
import { CarouselComponent } from 'src/app/components/carousel/carousel.component';
import {RouterModule  } from '@angular/router'; 
import { CategorySectionComponent } from '../../../components/category-section/category-section.component';
import { TopSearchComponent } from 'src/app/components/top-search/top-search.component';
import { FeaturedPostsComponent } from 'src/app/components/featured-posts/featured-posts.component';
@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [
    CommonModule,
    CarouselComponent,
    RouterModule,
    CategorySectionComponent,
    TopSearchComponent,
    FeaturedPostsComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredProducts: IProduct[] = [];
fallbackImages: string[] = [
    'https://shop2banh.vn/images/thumbs/2025/04/gu-trung-nhom-gh-racing-products-2442.jpg',
    'https://shop2banh.vn/images/thumbs/2022/10/bao-tay-gu-nhom-x1r-chinh-hang-products-1866.jpg',
    'https://shop2banh.vn/images/thumbs/2023/09/den-led-2-tang-zhipat-cho-wave-a-wave-s-wave-rsx-wave-rs-future-x-products-652.png',
    'https://shop2banh.vn/images/thumbs/2023/02/chan-chong-nghieng-inox-salaya-cho-vario-click-products-1641.jpg',
    'https://shop2banh.vn/images/thumbs/2025/04/phuoc-rcb-c2-den-ty-vang-cho-sirius-jupiter-chinh-hang-products-2432.png',
    'https://shop2banh.vn/images/thumbs/2020/04/loc-gio-luoi-thep-do-danh-cho-shvn-products-1051.jpg'
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts(): void {
    this.productService.getFeaturedProducts().subscribe({
      next: (res: IProduct[]) => {
        this.featuredProducts = res;
      },
      error: (err: any) => {
        console.error('Lỗi load sản phẩm nổi bật:', err);
      }
    });
  }
}

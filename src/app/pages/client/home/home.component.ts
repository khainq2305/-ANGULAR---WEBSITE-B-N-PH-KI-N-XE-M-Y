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

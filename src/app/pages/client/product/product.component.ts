import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from 'src/app/services/apis/category.service';
import { ProductService } from 'src/app/services/apis/product.service';
import { ICategory } from 'src/app/interface/category.interface';
import { IProduct } from 'src/app/interface/product.interface';

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
    this.categoryService.getClientCategoryList().subscribe(res => {
      this.categories = res;
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
      this.products = res.data.map((product: IProduct) => ({
        ...product,
        image: product.image?.startsWith('http')
          ? product.image
          : `http://localhost:3000/uploads/${product.image}`
      }));
      this.totalPages = res.totalPages;
    });
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

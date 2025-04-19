import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/apis/product.service';
import { IProduct } from 'src/app/interface/product.interface';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-search-overlay',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search-overlay.component.html',
  styleUrls: ['./search-overlay.component.scss'],
})
export class SearchOverlayComponent {
  @Input() openSearch = false;
  @Output() openSearchChange = new EventEmitter<boolean>();

  searchTerm = '';
  products: IProduct[] = [];

  constructor(private productService: ProductService) {}

  toggleSearch() {
    this.openSearch = !this.openSearch;
    this.openSearchChange.emit(this.openSearch);
    document.body.classList.toggle('modal-open', this.openSearch);
  }
  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5-I3nwE8w_QXqUKIaA9R5Rjr-l7UOVLdPWQ&s';
  }
  
  onSearchChange(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.searchTerm = input;

    if (this.searchTerm.trim() === '') {
      this.products = [];
      return;
    }

    this.productService.getClientProductsWithFilter({ search: this.searchTerm }).subscribe((res: any) => {
      this.products = (res.data || []).map((item: IProduct) => {
        return {
          ...item,
          image: item.image?.startsWith('http')
            ? item.image
            : `http://localhost:3001/uploads/${item.image || ''}`
        };
      });
      
    });
  }
}

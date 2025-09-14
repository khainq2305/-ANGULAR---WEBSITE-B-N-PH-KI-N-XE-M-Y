import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ICategory } from 'src/app/interface/category.interface'; // đảm g đúng đường dẫn
import { ProductService } from 'src/app/services/apis/product.service';
import { CategoryService } from 'src/app/services/apis/category.service';
import { IProduct } from 'src/app/interface/product.interface';
import { ConfirmDialogComponent } from 'src/app/components/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PaginationComponent } from 'src/app/components/shared/pagination/pagination.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    PaginationComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  displayedColumns = [
    'select',
    'stt',
    'thumbnail',
    'name',
    'price',
 
    'category',
    'quantity',
    'status',
    'action',
  ];

  dataSource = new MatTableDataSource<IProduct>([]);
  searchText = '';
  selectedCategory = '';
  selectedDate: Date | null = null;
  sortOrder = '';
  categoryOptions: { id: number; name: string }[] = [];
  statusFilter: string = '';
  currentTab: string = 'all';
  deleted: string = '';

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.loadData();
  }

  getCategories(): void {
    this.categoryService.getActiveCategories().subscribe({
      next: (res) => {
        console.log("✅ Danh mục active:", res.data); // ← THÊM DÒNG NÀY
        this.categoryOptions = res.data || [];
      },
      error: (err) => {
        console.error("❌ Lỗi khi lấy danh mục hoạt động:", err);
      }
    });
    
  }
  

  currentPage = 1;
  totalPages = 1;
  loadData(): void {
    const filters: any = { page: this.currentPage };

    if (this.searchText) filters.search = this.searchText;
    if (this.selectedCategory) filters.category = this.selectedCategory;
    if (this.selectedDate) {
      const key = this.currentTab === 'deleted' ? 'deletedAt' : 'createdAt';
      filters[key] = this.selectedDate.toISOString().split('T')[0];
    }

    if (this.sortOrder) filters.sort = this.sortOrder;
    if (this.statusFilter !== '') filters.status = this.statusFilter;
    if (this.deleted !== '') filters.deleted = this.deleted;

    this.productService
      .getProductList(filters)
      .subscribe((res: { data: IProduct[]; totalPages: number }) => {
    
        this.dataSource.data = res.data.map((p) => ({
          ...p,
          selected: false,
          finalPrice: p.price - p.discount,
        }));
        this.totalPages = res.totalPages || 1;
      });
  }
getImageUrl(imagePath?: string, index: number = 0): string {
  if (imagePath) {
    return `http://localhost:3001/uploads/${imagePath}`;
  }
  return this.fallbackImages[index % this.fallbackImages.length];
}

onImageError(event: Event, index: number) {
  const target = event.target as HTMLImageElement;
  target.src = this.fallbackImages[index % this.fallbackImages.length];
}

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadData();
  }

  setTab(tab: string): void {
    this.currentTab = tab;
    switch (tab) {
      case 'all':
        this.statusFilter = '';
        this.deleted = '';
        break;
      case 'active':
        this.statusFilter = '1';
        this.deleted = '';
        break;
      case 'inactive':
        this.statusFilter = '0';
        this.deleted = '';
        break;
      case 'deleted':
        this.deleted = 'true';
        break;
    }
    this.loadData();
  }

  openConfirmDialog(product: IProduct): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn xóa "${product.name}" không?` },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.deleteProduct(product);
    });
  }

  deleteProduct(product: IProduct): void {
    this.productService.deleteProduct(product.id).subscribe({
      next: () => {
        this.toastr.success('Đã chuyển sản phẩm vào thùng rác', 'Thành công');
        this.loadData();
      },
      error: () => {
        this.toastr.error('Không thể xóa sản phẩm', 'Lỗi');
      },
    });
  }
fallbackImages: string[] = [
  'https://shop2banh.vn/images/thumbs/2025/04/gu-trung-nhom-gh-racing-products-2442.jpg',
  'https://shop2banh.vn/images/thumbs/2022/10/bao-tay-gu-nhom-x1r-chinh-hang-products-1866.jpg',
  'https://shop2banh.vn/images/thumbs/2023/09/den-led-2-tang-zhipat-cho-wave-a-wave-s-wave-rsx-wave-rs-future-x-products-652.png',
  'https://shop2banh.vn/images/thumbs/2023/02/chan-chong-nghieng-inox-salaya-cho-vario-click-products-1641.jpg',
  'https://shop2banh.vn/images/thumbs/2025/04/phuoc-rcb-c2-den-ty-vang-cho-sirius-jupiter-chinh-hang-products-2432.png',
  'https://shop2banh.vn/images/thumbs/2020/04/loc-gio-luoi-thep-do-danh-cho-shvn-products-1051.jpg',
];

  deleteSelectedProducts(): void {
    const ids = this.dataSource.data.filter((p) => p.selected).map((p) => p.id);
    if (ids.length === 0) return;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc muốn xóa ${ids.length} sản phẩm?` },
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.productService.deleteMultipleProducts(ids).subscribe({
          next: () => {
            this.toastr.success(
              'Đã chuyển sản phẩm vào thùng rác',
              'Xóa thành công'
            );
            this.loadData();
          },
          error: () => {
            this.toastr.error('Không thể xóa sản phẩm đã chọn', 'Lỗi');
          },
        });
      }
    });
  }

  restoreProduct(product: IProduct): void {
    this.productService.restoreProduct(product.id).subscribe({
      next: () => {
        this.toastr.success('Khôi phục thành công', 'Thành công');
        this.loadData();
      },
      error: () => {
        this.toastr.error('Khôi phục thất bại', 'Lỗi');
      },
    });
  }

  permanentlyDeleteProduct(product: IProduct): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        message: `Bạn có chắc chắn muốn xóa vĩnh viễn "${product.name}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.permanentDeleteProduct(product.id).subscribe({
          next: () => {
            this.toastr.success('Đã xóa vĩnh viễn sản phẩm', 'Thành công');
            this.loadData();
          },
          error: () => {
            this.toastr.error('Không thể xóa vĩnh viễn sản phẩm', 'Lỗi');
          },
        });
      }
    });
  }
  restoreSelectedProducts(): void {
    const ids = this.dataSource.data.filter((p) => p.selected).map((p) => p.id);
    if (ids.length === 0) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc muốn khôi phục ${ids.length} sản phẩm?` },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        const restoreCalls = ids.map((id) =>
          this.productService.restoreProduct(id).toPromise()
        );

        Promise.all(restoreCalls)
          .then(() => {
            this.toastr.success('Đã khôi phục các sản phẩm', 'Thành công');
            this.loadData();
          })
          .catch(() => {
            this.toastr.error('Khôi phục thất bại', 'Lỗi');
          });
      }
    });
  }
  permanentlyDeleteSelected(): void {
    const ids = this.dataSource.data.filter((p) => p.selected).map((p) => p.id);
    if (ids.length === 0) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        message: `Bạn có chắc muốn xóa vĩnh viễn ${ids.length} sản phẩm?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.productService.permanentDeleteMultipleProducts(ids).subscribe({
          next: () => {
            this.toastr.success('Đã xóa vĩnh viễn các sản phẩm', 'Thành công');
            this.loadData();
          },
          error: () => {
            this.toastr.error('Không thể xóa các sản phẩm đã chọn', 'Lỗi');
          },
        });
      }
    });
  }

  toggleSelectAll(event: any): void {
    const checked = event.checked;
    this.dataSource.data.forEach((p) => (p.selected = checked));
  }

  isAllSelected(): boolean {
    return (
      this.dataSource.data.length > 0 &&
      this.dataSource.data.every((p) => p.selected)
    );
  }

  isIndeterminate(): boolean {
    return (
      this.dataSource.data.some((p) => p.selected) && !this.isAllSelected()
    );
  }
}

import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/shared/confirm-dialog/confirm-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HighlightDirective } from '../../hightlight/highlight.pipe';
import { CategoryService } from 'src/app/services/apis/category.service';

export interface CategoryData {
  id: number;
  uname: string;
  created_at: string;
  status: number;
  updated_at: string;
  imageUrl: string;
  selected?: boolean;
  productCount?: number;
}

const CATEGORY_DATA: CategoryData[] = [
  { id: 1, uname: 'Vỏ xe', created_at: '2025-03-01', status: 1, updated_at: '2025-03-14', imageUrl: 'https://shop2banh.vn/images/thumbs/2025/03/lop-goodride-h571-8090-14-9090-14-products-2420.jpg', selected: false },
  { id: 2, uname: 'Đèn xe máy', created_at: '2025-02-28', status: 0, updated_at: '2025-03-10', imageUrl: 'https://shop2banh.vn/images/thumbs/2025/03/lop-goodride-h571-8090-14-9090-14-products-2420.jpg', selected: false },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 5,
    uname: `Sản phẩm ${i + 5}`,
    created_at: `2025-02-${String((i % 28) + 1).padStart(2, '0')}`,
    status: i % 2,
    updated_at: `2025-03-${String((i % 28) + 1).padStart(2, '0')}`,
    imageUrl: 'https://shop2banh.vn/images/thumbs/2024/11/nhot-fuchs-silkolene-max-10w40-4t-08l-products-2374.png',
    selected: false
  })),
];

// Giả lập danh sách sản phẩm đang tồn tại
const PRODUCTS = [
  { id: 1, name: 'Nhớt A', categoryId: 1 },
  { id: 2, name: 'Đèn B', categoryId: 2 },
  { id: 3, name: 'Nhớt C', categoryId: 1 },
  { id: 4, name: 'Gương D', categoryId: 1 }
];

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    HighlightDirective,
    MatSortModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  imageUrl: string = 'https://shop2banh.vn/images/thumbs/2025/03/lop-goodride-h571-8090-14-9090-14-products-2420.jpg';
[x: string]: any;
  constructor(
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private categoryService: CategoryService
  ) {}

  filterStatus: number | string = 'all';
  filterCreatedAt: string = '';
  filterDescription: string = '';
  searchText: string = '';
  showNotFound: boolean = false;

  displayedColumns1: string[] = ['select', 'index', 'image', 'name', 'productCount', 'status', 'actions'];
  dataSource1 = new MatTableDataSource<CategoryData>([]);
  list: CategoryData[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.getAllCategory();
  }

  ngAfterViewInit() {
    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;

    this.dataSource1.sortingDataAccessor = (item: CategoryData, sortHeaderId: string): string | number => {
      switch (sortHeaderId) {
        case 'uname': return item.uname.toLowerCase();
        default: return (item as any)[sortHeaderId] ?? '';
      }
    };
  }

  getAllCategory() {
    this.categoryService.getCategoryList().subscribe({
      next: (res: any) => {
        this.list = res?.data ?? res;

        // Nếu bạn vẫn muốn tính productCount, bạn cần API trả thêm dữ liệu
        // Ví dụ: nếu có API trả danh sách sản phẩm, bạn có thể xử lý ở đây
        // Còn nếu API trả sẵn productCount thì bỏ qua bước này

        // Cập nhật vào table
        console.log('Dữ liệu danh mục:', this.list);
        this.dataSource1.data = this.list;
        this.showNotFound = this.dataSource1.filteredData.length === 0;
        
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  applyAdvancedFilter() {
    this.dataSource1.filterPredicate = (data: CategoryData) => {
      const matchStatus = this.filterStatus === 'all' || data.status === this.filterStatus;
      const matchDate = this.filterCreatedAt ? data.created_at.includes(this.filterCreatedAt) : true;
      const matchDescription = this.filterDescription ? data.uname.toLowerCase().includes(this.filterDescription.toLowerCase()) : true;
      return matchStatus && matchDate && matchDescription;
    };
    this.dataSource1.filter = Math.random().toString(); 
    this.showNotFound = this.dataSource1.filteredData.length === 0;
  }

  setFilterStatus(status: number | string) {
    this.filterStatus = status === 'all' ? 'all' : (typeof status === 'string' ? parseInt(status, 10) : status);
    this.applyAdvancedFilter();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  toggleSelectAll(event: any) {
    const isChecked = event.checked;
    this.dataSource1.data.forEach(row => row.selected = isChecked);
  }

  isAllSelected() {
    return this.dataSource1.data.length > 0 && this.dataSource1.data.every(row => row.selected);
  }

  isIndeterminate() {
    return this.dataSource1.data.some(row => row.selected) && !this.isAllSelected();
  }

  confirmDelete(category: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn xóa "${category.uname}" không?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCategory(category);
      }
    });
  }

  deleteCategory(category: any) {
    alert(`Danh mục "${category.name}" đã bị xóa!`);
    this.dataSource1.data = this.dataSource1.data.filter(item => item.id !== category.id);
  }
}



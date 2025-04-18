import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
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
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';
import { ICategory } from 'src/app/interface/category.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { PaginationComponent } from '../../../../components/shared/pagination/pagination.component';
import { DEFAULT_IMAGE_URL } from 'src/app/config/api-endpoint.config';
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
    RouterModule,
    PaginationComponent,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit {
  apiUrlImage = API_ENDPOINT.category.uploads;
  DEFAULT_IMAGE_URL = DEFAULT_IMAGE_URL;
  filterStatus: number | string = 'all';
  filterCreatedAt: string = '';
  filterDescription: string = '';
  searchText: string = '';
  showNotFound: boolean = false;

  displayedColumns1: string[] = ['select', 'index', 'image', 'name', 'productCount', 'status', 'actions'];
  dataSource1 = new MatTableDataSource<ICategory>([]);
  list: ICategory[] = [];

  currentPage = 1;
  totalPages = 1;
  pageSize = 10; // Số bản ghi mỗi trang

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getAllCategory();
  }
  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.DEFAULT_IMAGE_URL;
  }
  getItemIndex(index: number): number {
    // If you need to account for pagination, you can add this logic
    return this.pageSize * (this.currentPage - 1) + (index + 1);
  }
  
  ngAfterViewInit() {
    this.dataSource1.sort = this.sort;
    this.dataSource1.sortingDataAccessor = (item: ICategory, sortHeaderId: string): string | number => {
      switch (sortHeaderId) {
        case 'name':
          return item.name.toLowerCase();
        default:
          return (item as any)[sortHeaderId] ?? '';
      }
    };
  }

  
  // Cách gọi đúng
  getImageUrl(relativePath: string): string {
    return  `${this.apiUrlImage}/${relativePath}`;
    
  }



  getAllCategory() {
    const filters: any = {
      page: this.currentPage,
      limit: this.pageSize,
    };
  
    // Gửi các tham số lọc bổ sung
    if (this.filterDescription) filters.search = this.filterDescription;
    if (this.filterCreatedAt) filters.createdAt = this.filterCreatedAt;
    if (this.filterStatus !== 'all') filters.status = this.filterStatus;
  
    this.categoryService.getCategoryList(filters).subscribe({
      next: (res) => {
        console.log('Dữ liệu trả về:', res);
        this.list = res.data.map((item) => ({ ...item, selected: false }));
        this.dataSource1.data = this.list;
        this.totalPages = res.totalPages;  // Kiểm tra lại totalPages ở đây
        this.showNotFound = this.dataSource1.data.length === 0;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.toastr.error('Không thể tải danh sách danh mục', 'Lỗi');
      },
    });
  }
  

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getAllCategory();
  }

  applyAdvancedFilter() {
    this.currentPage = 1;
    this.getAllCategory();
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
    this.dataSource1.data.forEach((row) => (row.selected = isChecked));
  }

  isAllSelected() {
    return this.dataSource1.data.length > 0 && this.dataSource1.data.every((row) => row.selected);
  }

  isIndeterminate() {
    return this.dataSource1.data.some((row) => row.selected) && !this.isAllSelected();
  }

  toggleStatus(category: ICategory) {
    category.status = category.status === 1 ? 0 : 1;
    this.dataSource1.data = [...this.dataSource1.data];
    this.applyAdvancedFilter();
  }

  softDeleteCategory(category: ICategory) {
    const updatedCategory = { ...category, deletedAt: new Date() };

    this.categoryService.softDeleteCategory(updatedCategory).subscribe({
      next: (response) => {
        this.toastr.success(`Danh mục "${category.name}" đã bị xóa!`, 'Thành công');
        this.getAllCategory();
      },
      error: (err) => {
        console.error('Có lỗi xảy ra khi xóa mềm danh mục', err);
        this.toastr.error('Không thể xóa danh mục', 'Lỗi');
      },
    });
  }

  confirmSoftDelete(category: ICategory) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Xác nhận xóa mềm',
        message: `Bạn có chắc chắn muốn xóa mềm danh mục "${category.name}" không?`,
        confirmText: 'Xóa mềm',
        cancelText: 'Hủy',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.softDeleteCategory(category);
      }
    });
  }

  deleteCategory(category: ICategory) {
    this.toastr.success(`Danh mục "${category.name}" đã bị xóa!`, 'Thành công');
    this.getAllCategory();
  }
}

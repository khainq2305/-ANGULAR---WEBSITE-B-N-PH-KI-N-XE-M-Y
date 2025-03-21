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

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HighlightDirective } from '../../hightlight/highlight.pipe';

export interface CategoryData {
  id: number;
  uname: string;
  created_at: string;
  status: number;
  updated_at: string;
  imageUrl: string;
  selected?: boolean;
}

const PRODUCT_DATA: CategoryData[] = [
  {
    id: 1,
    uname: 'Vỏ xe',
    created_at: '2025-03-01',
    status: 1,  
    updated_at: '2025-03-14',
    imageUrl: 'https://shop2banh.vn/images/thumbs/2025/03/lop-goodride-h571-8090-14-9090-14-products-2420.jpg',
    selected: false
  },
  {
    id: 2,
    uname: 'Đèn xe máy',
    created_at: '2025-02-28',
    status: 0,  
    updated_at: '2025-03-10',
    imageUrl: 'https://shop2banh.vn/images/thumbs/2025/03/lop-goodride-h571-8090-14-9090-14-products-2420.jpg',
    selected: false
  },
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

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
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
  constructor(private dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer) {}

  filterStatus: number | string = 'all';
  showNotFound: boolean = false;
  searchText: string = '';

  displayedColumns1: string[] = ['select', 'index', 'image', 'name', 'status', 'actions'];


  dataSource1 = new MatTableDataSource(PRODUCT_DATA);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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

  setFilterStatus(status: number | string) {
    this.filterStatus = status === 'all' ? 'all' : (typeof status === 'string' ? parseInt(status, 10) : status);
    this.applyStatusFilter();
  }

  applyStatusFilter() {
    this.dataSource1.filterPredicate = (data: CategoryData) => {
      return this.filterStatus === 'all' || data.status === this.filterStatus;
    };
    this.dataSource1.filter = Math.random().toString();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchText = filterValue;
  
    this.dataSource1.filterPredicate = (data: CategoryData, filter: string) => {
      return Object.values(data).some(value => {
        let strValue = String(value).trim().toLowerCase();
        if (strValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
          const [year, month, day] = strValue.split("-");
          strValue = `${day}/${month}/${year}`;
        }
        return strValue.includes(filter);
      });
    };
  
    this.dataSource1.filter = filterValue;
    this.showNotFound = this.dataSource1.filteredData.length === 0;
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

  // ✅ Hàm mở Dialog Xác Nhận Xóa
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

  // ✅ Hàm Xóa danh mục
  deleteCategory(category: any) {
    alert(`Danh mục "${category.uname}" đã bị xóa!`);
    this.dataSource1.data = this.dataSource1.data.filter(item => item.id !== category.id);
  }
}

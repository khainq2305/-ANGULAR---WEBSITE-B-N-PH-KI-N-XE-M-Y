import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { FormsModule } from '@angular/forms';

import { LiveAnnouncer } from '@angular/cdk/a11y';

import { HighlightDirective } from '../../hightlight/highlight.pipe';

export interface CategoryData {
  id: number;
  uname: string;
  created_at: string;  // Đổi thành chuỗi
  status: number;  // 0 hoặc 1
  updated_at: string;  // Ngày cập nhật
  highlightedUname?: string;
}

const PRODUCT_DATA: CategoryData[] = [
  {
    id: 1,
    uname: 'iPhone 13 Pro Max - Pacific Blue - 128GB Storagexx',
    created_at: '2025-03-01',  // Đổi thành chuỗi
    status: 1,  
    updated_at: '2025-03-14',
  },
  {
    id: 2,
    uname: 'Apple MacBook Pro 13 inch - M1 - 8/256GB - Space',
    created_at: '2025-02-28',
    status: 0,  
    updated_at: '2025-03-10',
  },
  {
    id: 3,
    uname: 'PlayStation 5 DualSense Wireless Controller',
    created_at: '2025-02-25',
    status: 1,
    updated_at: '2025-03-08',
  },
  {
    id: 4,
    uname: 'Amazon Basics Mesh, Mid-Back, Swivel Office',
    created_at: '2025-02-20',
    status: 0,
    updated_at: '2025-03-12',
  },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 5,
    uname: `Sản phẩm ${i + 5}`,
    created_at: `2025-02-${String((i % 28) + 1).padStart(2, '0')}`,
    status: i % 2, // Luân phiên 0 hoặc 1
    updated_at: `2025-03-${String((i % 28) + 1).padStart(2, '0')}`,
  })),
];

@Component({
  selector: 'app-list',
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
  constructor(private _liveAnnouncer: LiveAnnouncer) {}
  filterStatus: number | string = 'all';
  showNotFound: boolean = false;
  searchText: string = '';
  
  displayedColumns1: string[] = ['index', 'name', 'status', 'budget',];
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
  
        // Kiểm tra xem giá trị có phải là ngày định dạng "YYYY-MM-DD" không
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
}

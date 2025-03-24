import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';


@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatTableModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    
  ],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['stt', 'image', 'productName', 'totalComments', 'avgRating', 'actions'];

  dataSource: MatTableDataSource<any>;
  searchText: string = '';
  filterType: 'highest' | 'lowest' | 'all' = 'all';
  sortOrder: 'asc' | 'desc' = 'asc';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  comments = [
    { productId: 1, productName: 'Đĩa Kingspeed 260mm', imageUrl: 'https://shop2banh.vn/images/thumbs/2023/06/gu-carbon-fiber-chong-rung-dam-tay-lai-cho-ab-160-vario-160-products-2039.jpg', totalComments: 120, avgRating: 4.2, },
    { productId: 2, productName: 'Phuộc RCB Flow Pro', imageUrl: 'https://shop2banh.vn/images/thumbs/2022/11/tay-thang-cnc-cho-honda-vario-products-1927.jpg', totalComments: 85, avgRating: 4, },
    { productId: 3, productName: 'Nhớt Liqui Moly 5W30', imageUrl: 'https://shop2banh.vn/images/thumbs/2024/04/phuoc-profender-x-series-cho-pcx-160-products-2298.png', totalComments: 45, avgRating: 3 },
    { productId: 4, productName: 'Dây ga đôi Uma Racing', imageUrl: 'https://shop2banh.vn/images/thumbs/2023/06/loc-nhot-vespa-chinh-hang-products-2114.png', totalComments: 79 , avgRating: 5},
    { productId: 5, productName: 'Bình ắc quy GS GTZ6V', imageUrl: 'https://shop2banh.vn/images/thumbs/2024/01/vo-swallow-9090-14-s-222-products-2236.jpg', totalComments: 40, avgRating: 1 },
    { productId: 6, productName: 'Cặp vỏ Dunlop TT902', imageUrl: 'https://shop2banh.vn/images/thumbs/2024/08/nhot-motul-7100-10w40-1lit-products-2346.jpg', totalComments: 88 , avgRating: 2},
    { productId: 7, productName: 'Lốp Michelin City Grip 2', imageUrl: 'https://shop2banh.vn/images/thumbs/2023/07/ve-sinh-kim-phun-xang-dien-tu-fi-products-1373.jpg', totalComments: 95, avgRating: 3 },
    { productId: 8, productName: 'Nhớt Motul 7100 10W40', imageUrl: 'https://shop2banh.vn/images/thumbs/2024/04/goi-bao-duong-xe-tay-ga-tieu-chuan-11-buoc-products-2276.jpg', totalComments: 110, avgRating: 3.5 },

  ];

  constructor(private router: Router) {  

    this.dataSource = new MatTableDataSource(this.comments);
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.productName.toLowerCase().includes(filter.trim().toLowerCase());
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
// Thêm getter để gọi Math từ template
get Math() {
  return Math;
}

  applyFilter() {
    let filteredData = [...this.comments];

    if (this.filterType === 'highest') {
      const maxComments = Math.max(...this.comments.map(c => c.totalComments));
      filteredData = this.comments.filter(c => c.totalComments === maxComments);
    } else if (this.filterType === 'lowest') {
      const minComments = Math.min(...this.comments.map(c => c.totalComments));
      filteredData = this.comments.filter(c => c.totalComments === minComments);
    }

    if (this.searchText.trim()) {
      filteredData = filteredData.filter(item =>
        item.productName.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    this.dataSource.data = filteredData;
    this.dataSource.paginator?.firstPage();
  }

  setFilter(type: 'highest' | 'lowest' | 'all') {
    this.filterType = type;
    this.applyFilter();
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.applySort();
  }

  applySort() {
    this.dataSource.data = [...this.dataSource.data].sort((a, b) => {
      return this.sortOrder === 'asc'
        ? a.totalComments - b.totalComments
        : b.totalComments - a.totalComments;
    });
  }

 
  getIndex(index: number): number {
    return index + 1 + (this.paginator?.pageIndex || 0) * (this.paginator?.pageSize || 5);
  }

  viewDetail(productId: number) {
    this.router.navigate(['/ui-components/comment/comment-detail', productId]);
  }
  
}

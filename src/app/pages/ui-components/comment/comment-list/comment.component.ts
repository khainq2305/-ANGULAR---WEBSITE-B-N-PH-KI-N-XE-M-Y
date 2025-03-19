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
  displayedColumns: string[] = ['stt', 'image', 'productName', 'totalComments', 'actions'];
  dataSource: MatTableDataSource<any>;
  searchText: string = '';
  filterType: 'highest' | 'lowest' | 'all' = 'all';
  sortOrder: 'asc' | 'desc' = 'asc';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  comments = [
    { productId: 1, productName: 'Đĩa Kingspeed 260mm', imageUrl: '...', totalComments: 120 },
    { productId: 2, productName: 'Phuộc RCB Flow Pro', imageUrl: '...', totalComments: 85 },
    { productId: 3, productName: 'Nhớt Liqui Moly 5W30', imageUrl: '...', totalComments: 45 },
    { productId: 4, productName: 'Dây ga đôi Uma Racing', imageUrl: '...', totalComments: 79 },
    { productId: 5, productName: 'Bình ắc quy GS GTZ6V', imageUrl: '...', totalComments: 40 },
    { productId: 6, productName: 'Cặp vỏ Dunlop TT902', imageUrl: '...', totalComments: 88 },
    { productId: 7, productName: 'Lốp Michelin City Grip 2', imageUrl: '...', totalComments: 95 },
    { productId: 8, productName: 'Nhớt Motul 7100 10W40', imageUrl: '...', totalComments: 110 },
    { productId: 9, productName: 'Baga trước Winner X', imageUrl: '...', totalComments: 47 },
    { productId: 10, productName: 'Cùm thắng RCB S1', imageUrl: '...', totalComments: 128 }
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

  // ✅ Hàm tính số thứ tự chính xác theo trang
  getIndex(index: number): number {
    return index + 1 + (this.paginator?.pageIndex || 0) * (this.paginator?.pageSize || 5);
  }

  viewDetail(productId: number) {
    this.router.navigate(['/ui-components/comment/comment-detail', productId]);
  }
  
}

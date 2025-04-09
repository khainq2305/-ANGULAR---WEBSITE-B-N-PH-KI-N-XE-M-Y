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
import { CommentService } from 'src/app/services/apis/comment.service'; 

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
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  searchText: string = '';
  filterType: 'highest' | 'lowest' | 'all' = 'all';
  sortOrder: 'asc' | 'desc' = 'asc';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  originalComments: any[] = [];

  constructor(private router: Router, private commentService: CommentService) {}

  ngOnInit() {
    this.loadComments();
    this.dataSource.filterPredicate = (data: any, filter: string) =>
      data.productName.toLowerCase().includes(filter.trim().toLowerCase());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadComments() {
    this.commentService.getSummary().subscribe({
      next: (res) => {
        this.originalComments = res.data; 
        this.dataSource.data = [...this.originalComments];
      },
      error: (err) => {
        
        console.error('Lỗi khi tải danh sách bình luận:', err);
      }
    });
  }
  

  get Math() {
    return Math;
  }

  applyFilter() {
    let filteredData = [...this.originalComments];

    if (this.filterType === 'highest') {
      const max = Math.max(...filteredData.map(c => c.totalComments));
      filteredData = filteredData.filter(c => c.totalComments === max);
    } else if (this.filterType === 'lowest') {
      const min = Math.min(...filteredData.map(c => c.totalComments));
      filteredData = filteredData.filter(c => c.totalComments === min);
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
    this.dataSource.data = [...this.dataSource.data].sort((a, b) =>
      this.sortOrder === 'asc'
        ? a.totalComments - b.totalComments
        : b.totalComments - a.totalComments
    );
  }

  getIndex(index: number): number {
    return index + 1 + (this.paginator?.pageIndex || 0) * (this.paginator?.pageSize || 5);
  }

  viewDetail(productId: number) {
    this.router.navigate(['/admin/ui-components/comment/comment-detail', productId]);
  }
  
}

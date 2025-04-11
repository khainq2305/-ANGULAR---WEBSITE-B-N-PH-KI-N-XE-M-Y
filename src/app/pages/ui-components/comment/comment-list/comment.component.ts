import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommentService } from 'src/app/services/apis/comment.service';
import { ProductCommentSummary } from 'src/app/interface/comment.interface';
import { PaginationComponent } from 'src/app/components/shared/pagination/pagination.component';

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
    MatSortModule,
    FormsModule,
    PaginationComponent
  ],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'stt',
    'image',
    'productName',
    'totalComments',
    'avgRating',
    'actions',
  ];

  dataSource: MatTableDataSource<ProductCommentSummary> =
    new MatTableDataSource<ProductCommentSummary>();

  originalComments: ProductCommentSummary[] = [];
  searchText: string = '';
  filterType: 'highest' | 'lowest' | 'all' = 'all';
  sortOrder: 'asc' | 'desc' = 'asc';

  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private commentService: CommentService) {}

  ngOnInit() {
    this.loadComments();
    this.dataSource.filterPredicate = (
      data: ProductCommentSummary,
      filter: string
    ) => data.productName.toLowerCase().includes(filter.trim().toLowerCase());
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  loadComments() {
    this.commentService.getSummary().subscribe({
      next: (res) => {
        this.originalComments = res.data.map((item) => ({
          ...item,
          avgRating: isNaN(Number(item.avgRating)) ? 0 : item.avgRating,
        }));
        this.dataSource.data = [...this.originalComments];
        this.totalPages = Math.ceil(this.dataSource.data.length / this.pageSize);
      },
      error: (err) => {
        console.error('Lỗi khi tải danh sách bình luận:', err);
      },
    });
  }

  get paginatedData(): ProductCommentSummary[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.dataSource.data.slice(start, start + this.pageSize);
  }

  get Math() {
    return Math;
  }

  getIndex(index: number): number {
    return index + 1 + (this.currentPage - 1) * this.pageSize;
  }

  applyFilter() {
    let filteredData = [...this.originalComments];

    if (this.filterType === 'highest') {
      const max = Math.max(...filteredData.map((c) => c.totalComments));
      filteredData = filteredData.filter((c) => c.totalComments === max);
    } else if (this.filterType === 'lowest') {
      const min = Math.min(...filteredData.map((c) => c.totalComments));
      filteredData = filteredData.filter((c) => c.totalComments === min);
    }

    if (this.searchText.trim()) {
      filteredData = filteredData.filter((item) =>
        item.productName.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    this.dataSource.data = filteredData;
    this.totalPages = Math.ceil(filteredData.length / this.pageSize);
    this.currentPage = 1;
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

  changePage(page: number) {
    this.currentPage = page;
  }

  isNumber(value: any): boolean {
    return typeof value === 'number' && !isNaN(value);
  }

  viewDetail(productId: number) {
    this.router.navigate(['/admin/ui-components/comment/comment-detail', productId]);
  }
}

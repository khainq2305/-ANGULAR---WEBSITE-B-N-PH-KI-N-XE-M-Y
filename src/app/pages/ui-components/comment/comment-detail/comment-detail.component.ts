import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommentReplyDialogComponent } from '../comment-reply-dialog/comment-reply-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { CommentService } from 'src/app/services/apis/comment.service';
import { Comment } from 'src/app/interface/comment.interface';
import { PaginationComponent } from 'src/app/components/shared/pagination/pagination.component';


@Component({
  selector: 'app-comment-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    MatMenuModule,
    PaginationComponent
  ],
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.scss']
})
export class CommentDetailComponent implements OnInit {
  productId!: number;
  productName: string = '';
  originalComments: Comment[] = [];
  filteredComments: Comment[] = [];
  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number = 1;

  displayedColumns: string[] = ['stt', 'avatar', 'user', 'rating', 'content', 'status', 'adminReply', 'actions'];

  @ViewChild(MatSort) sort!: MatSort;

  showReplyForm: { [key: number]: boolean } = {};
  replyInput: { [key: number]: string } = {};

  ratingOptions = [
    { value: 5, label: '5 sao' },
    { value: 4, label: '4 sao' },
    { value: 3, label: '3 sao' },
    { value: 2, label: '2 sao' },
    { value: 1, label: '1 sao' }
  ];

  selectedStatus: string = 'all';
  selectedRating: string | number = 'all';
  searchText: string = '';

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.loadComments();
    });
  }

  loadComments() {
    this.commentService.getCommentsByProduct(this.productId).subscribe({
      next: (res) => {
        const comments: Comment[] = res.comments || [];
        this.originalComments = comments;
        this.productName = res.productName || 'Sản phẩm';
        this.applyFilter();
      },
      error: (err) => {
        console.error('❌ Lỗi khi tải bình luận:', err);
        this.productName = 'Lỗi khi tải sản phẩm';
        this.originalComments = [];
        this.filteredComments = [];
      }
    });
  }

  get paginatedComments(): Comment[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredComments.slice(start, start + this.pageSize);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  applyFilter() {
    let filteredData = [...this.originalComments];

    if (this.selectedRating !== 'all') {
      filteredData = filteredData.filter(comment => comment.rating === this.selectedRating);
    }

    if (this.selectedStatus === 'replied') {
      filteredData = filteredData.filter(comment => comment.reply);
    } else if (this.selectedStatus === 'not_replied') {
      filteredData = filteredData.filter(comment => !comment.reply);
    }

    if (this.searchText.trim()) {
      filteredData = filteredData.filter(comment =>
        comment.content.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    this.filteredComments = filteredData;
    this.totalPages = Math.ceil(filteredData.length / this.pageSize);
    this.currentPage = 1;
  }

  openReplyDialog(comment: Comment, isEdit: boolean = false) {
    const dialogRef = this.dialog.open(CommentReplyDialogComponent, {
      width: '500px',
      data: { user: comment.user, reply: isEdit ? comment.reply : '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        comment.reply = result;
        comment.replyDate = new Date().toISOString().split('T')[0];
        this.applyFilter();
      }
    });
  }

  submitReply(commentId: number) {
    const replyContent = this.replyInput[commentId]?.trim();
    if (replyContent) {
      console.log(`Reply for comment ${commentId}: ${replyContent}`);
      this.replyInput[commentId] = '';
      this.showReplyForm[commentId] = false;
    }
  }

  toggleReplyForm(commentId: number) {
    this.showReplyForm[commentId] = !this.showReplyForm[commentId];
  }
}

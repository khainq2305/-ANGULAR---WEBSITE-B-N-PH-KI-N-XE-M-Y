import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommentReplyDialogComponent } from '../comment-reply-dialog/comment-reply-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { CommentService } from 'src/app/services/apis/comment.service';

@Component({
  selector: 'app-comment-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    MatMenuModule,
  ],
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.scss']
})
export class CommentDetailComponent implements OnInit {
  productId!: number;
  productName: string = '';
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['stt', 'avatar', 'user', 'rating', 'content', 'status', 'adminReply', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
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

  originalComments: any[] = [];

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
        if (res.success) {
          this.productName = res.productName || 'Sản phẩm';
          this.originalComments = res.comments || [];
          this.dataSource.data = this.originalComments;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      error: (err) => {
        console.error('Lỗi khi tải bình luận:', err);
        this.productName = 'Lỗi khi tải sản phẩm';
        this.dataSource.data = [];
      }
    });
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

    this.dataSource.data = filteredData;
    this.dataSource.paginator?.firstPage();
  }

  openReplyDialog(comment: any, isEdit: boolean = false) {
    const dialogRef = this.dialog.open(CommentReplyDialogComponent, {
      width: '500px',
      data: { user: comment.user, reply: isEdit ? comment.reply : '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        comment.reply = result;
        comment.replyDate = new Date().toISOString().split('T')[0]; // tạm thời set ngày hôm nay
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
    if (!this.showReplyForm) {
      this.showReplyForm = {};
    }
    this.showReplyForm[commentId] = !this.showReplyForm[commentId];
  }
}

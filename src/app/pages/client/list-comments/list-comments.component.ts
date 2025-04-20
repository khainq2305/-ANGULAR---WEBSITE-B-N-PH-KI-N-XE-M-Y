import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommentService } from 'src/app/services/apis/comment.service';
import { Comment } from 'src/app/interface/comment.interface';
import { ClientUserService } from 'src/app/services/apis/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';
import { DEFAULT_IMAGE_USER } from 'src/app/config/api-endpoint.config';

@Component({
  selector: 'app-list-comments',
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  standalone: true,
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.scss'],
})
export class ListCommentsComponent implements OnInit {
  comments: Comment[] = [];
  productId!: number;
  @Input() userId!: number;
  @Input() review!: Comment;
  isEditing = false;
  editingCommentId: number | null = null;
  isReviewFormVisible = false;
  currentPage: number = 1; // Khởi tạo rõ ràng
  totalPages: number = 1; // Khởi tạo rõ ràng
  commentsPerPage: number = 5; // Khởi tạo rõ ràng
  totalComments: number = 0; // Khởi tạo rõ ràng

  constructor(
    private commentService: CommentService,
    private ClientUserService: ClientUserService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit: currentPage =', this.currentPage, 'commentsPerPage =', this.commentsPerPage);
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.productId = +id;
        this.getCommentByProductId(this.productId);
      } else {
        this.toastr.error('Không tìm thấy ID sản phẩm!');
      }
    });
    this.sharedService.resetViews();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId']) {
    }
  }

  isMyComment(comment: Comment): boolean {
    return comment.userId === this.userId;
  }

  changePage(page: number): void {
    console.log('changePage: currentPage =', this.currentPage, 'new page =', page);
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getCommentByProductId(this.productId);
    }
  }

  onsubmit(): void {
    if (this.isEditing && this.editingCommentId) {
      this.updateComment(this.editingCommentId, this.review.content);
      this.isEditing = false;
      this.editingCommentId = null;
      this.sharedService.notifyCheckComment();
    } else {
      this.toastr.error('Vui lòng nhập nội dung bình luận');
    }
    this.toastr.success('Bình luận của bạn đã được gửi thành công!');
    this.getCommentByProductId(this.productId);
    console.log('Đã gửi bình luận:', this.review);
  }

  startEditing(commentId: number): void {
    const comment = this.comments.find((c) => c.id === commentId);
    if (comment) {
      this.review.rating = comment.rating;
      this.review.content = comment.content;
      this.editingCommentId = commentId;
      this.isEditing = true;
    }
  }

  getCommentByProductId(productId: number): void {
    // Kiểm tra tham số
    if (!productId || isNaN(this.currentPage) || isNaN(this.commentsPerPage)) {
      console.error('Tham số không hợp lệ:', {
        productId,
        page: this.currentPage,
        limit: this.commentsPerPage,
      });
      this.toastr.error('Thông tin phân trang hoặc ID sản phẩm không hợp lệ!');
      this.comments = [];
      this.totalComments = 0;
      this.totalPages = 1;
      return;
    }

    console.log('Gọi getCommentsByProduct:', {
      productId,
      page: this.currentPage,
      limit: this.commentsPerPage,
    });

    this.commentService
      .getCommentsByProduct(productId, this.currentPage, this.commentsPerPage)
      .subscribe({
        next: (res: any) => {
          if (res?.success && res.comments?.length > 0) {
            this.comments = res.comments.map((comment: any) => ({
              ...comment,
              userId: comment.idUser, // Giữ nguyên mapping
              avatar: comment.avatar || `${DEFAULT_IMAGE_USER}`,
            })) as Comment[];

            // Cập nhật phân trang
            this.totalComments = res.totalComments || 0;
            this.totalPages = res.totalPages || 1;
            this.currentPage = parseInt(res.currentPage, 10) || 1;
          } else {
            this.comments = [];
            this.totalComments = 0;
            this.totalPages = 1;
            this.toastr.info(res?.message || 'Chưa có bình luận nào.');
          }
        },
        error: (err) => {
          console.error('❌ Lỗi khi lấy chi tiết sản phẩm:', err);
          this.toastr.error('Không thể tải bình luận. Vui lòng thử lại!');
          this.comments = [];
          this.totalComments = 0;
          this.totalPages = 1;
        },
      });
  }

  toggleReviewForm() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.resetReview();
    }
  }

  resetReview() {
    this.review = {
      id: 0,
      userId: this.userId,
      productId: this.productId,
      rating: 5,
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  deleteComment(commentId: number): void {
    this.commentService.deleteComment(commentId).subscribe({
      next: (res) => {
        this.comments = this.comments.filter((comment) => comment.id !== commentId);
        this.getCommentByProductId(this.productId);
        this.sharedService.notifyCheckComment();
      },
      error: (err) => {
        console.error('Lỗi khi xóa bình luận:', err);
        this.toastr.error('Xóa bình luận không thành công!');
      },
    });
    console.log('Xóa bình luận với ID:', commentId);
    this.toastr.success('Xóa bình luận thành công!');
  }

  updateComment(commentId: number, updatedContent: string): void {
    this.commentService.editComment(commentId, { content: updatedContent }).subscribe({
      next: (res) => {
        console.log('Cập nhật bình luận thành công:', res);
        this.getCommentByProductId(this.productId);
      },
      error: (err) => {
        console.error('Lỗi khi cập nhật bình luận:', err);
        this.toastr.error('Cập nhật bình luận không thành công!');
      },
    });
    console.log(`Cập nhật bình luận với ID: ${commentId}, nội dung mới: ${updatedContent}`);
  }
}
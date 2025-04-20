import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Comment as Review } from 'src/app/interface/comment.interface'; // Assuming Review is similar to Comment
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommentService } from 'src/app/services/apis/comment.service';
import { Comment } from 'src/app/interface/comment.interface';
import { OrderService } from 'src/app/services/apis/order.service';
import { ClientUserService } from 'src/app/services/apis/auth.service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-comment',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  canComment: boolean = false;
  isReviewFormVisible = false;
  showInputComment: boolean = false;
  isCommented: boolean = false;
  userId: number = 0;
  productId: number = 0;
  review: Comment;
  @Output() userStatusUser = new EventEmitter<any>();

  constructor(
    private commentService: CommentService,
    private orderService: OrderService,
    private authService: ClientUserService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private sharedService: SharedService
  ) { }
  private initReview(): Review {
    return {
      id: 0,
      userId: this.userId,
      productId: this.productId,
      rating: 5,
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.toast.error('Vui lòng đăng nhập để bình luận!');
      return;
    }

    // Giải mã token và lấy idUser
    const decoded: any = jwtDecode(token);
    const idUser = decoded.id;

    if (idUser) {
      this.userId = idUser;
      this.checkOrder();
    } else {
      return;
    }

    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    this.review = this.initReview();
    this.userStatusUser.emit({
      userId: this.userId,
      review: this.review,
      
    });
    this.sharedService.commentChecked$.subscribe(() => {
      this.checkCommentId();
    });
    this.sharedService.resetView$.subscribe(() =>{
      this.resetReview()
    })
  }



  toggleReviewForm() {
    this.isReviewFormVisible = !this.isReviewFormVisible;
    if (!this.isReviewFormVisible) {
      this.resetReview();
    }
  }
  checkOrder() {
    if (this.userId) {
      this.orderService.getOrdersByUser().subscribe({
        next: (response: any) => {
          const orders = response.orders;

          if (!Array.isArray(orders)) {
            console.error('Dữ liệu trả về không phải là mảng:', orders);
            return false;
          }

          const validOrder = orders.find(order => {
            // Kiểm tra sự tồn tại của orderDetails
            if (!order.orderDetails || !Array.isArray(order.orderDetails) || order.orderDetails.length === 0) {
              console.error('orderDetails không tồn tại hoặc không phải là mảng:', order.orderDetails);
              return false;
            }
            console.log('chi tiết đơn hàng:', order.orderDetails);
            // Lọc các sản phẩm trong đơn hàng
            const hasValidProduct = order.orderDetails.some((detail: any) => {
              return detail.idProduct === this.productId;
            });

            // Kiểm tra trạng thái thanh toán và đơn hàng đã thanh toán
            const paymentStatus = order.payment_status || 'pending'; // Giá trị mặc định là 'pending'
            const status = order.status || 0; // Giá trị mặc định là 0 (hoặc bạn có thể chọn giá trị khác)
            console.log('Đơn hàng:', paymentStatus, status);
            return hasValidProduct && paymentStatus === 'paid' && status === 3; // Trạng thái là 'paid' và status là 3
          });
          console.log('Đơn hàng:', orders);
          console.log('Đơn hàng hợp lệ:', validOrder);

          if (validOrder) {
            this.checkCommentId();
            this.review = {
              id: 0,
              userId: this.userId,
              productId: this.productId,
              rating: 5,
              content: '',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            console.log('Người dùng đã mua sản phẩm này:', validOrder);
            return true;
          } else {
            console.log('Người dùng chưa mua sản phẩm này hoặc đơn hàng không hợp lệ:', orders);
            return false;
          }
        },
        error: (err) => {
          this.canComment = false;
          console.error('Lỗi khi kiểm tra đơn hàng:', err);
          alert('Lỗi khi kiểm tra đơn hàng. Vui lòng thử lại sau!');
          return false;
        }
      });
    } else {
      console.log('không có user nghỉ kiểm tra')
      return
    }
  };



  submitReview() {
    if (!this.review.content) {
      this.toast.warning('Vui lòng nhập nội dung đánh giá!');
      return;
    }
    this.addComment();

  }
  checkCommentId() {
    this.commentService.checkUserComment(this.userId, this.productId).subscribe({
      next: (res: any) => {
        if (res.exists) {
          this.isReviewFormVisible = false;
          console.log('Người dùng đã bình luận cho sản phẩm này:', res);
        } else {
          this.canComment = true
          console.log('Người dùng chưa bình luận cho sản phẩm này:', res);
        }
      }, error: (err) => {
        console.error('Lỗi khi kiểm tra đánh giá:', err);
      }
    });
  }


  addComment() {
    const dataToSend = {
      idUser: this.review.userId,
      product_id: this.review.productId,
      content: this.review.content,
      rating: this.review.rating
    };

    this.commentService.addComment(dataToSend).subscribe({
      next: (res: any) => {
        if (res && res.success) {  
          this.toast.success('Đánh giá của bạn đã được gửi thành công!');
          this.sharedService.notifyCommentAdded();
          setTimeout(() => {
            this.checkCommentId();
          }, 1000);
          this.resetReview()
          
        }
      },
      error: (err) => {
        console.error('Lỗi khi gửi đánh giá:', err);
        return false
      }
    });
  }

  resetReview() {
    this.review = {
      id: 0,
      userId: this.userId,
      productId: this.productId,
      rating: 5,
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
}

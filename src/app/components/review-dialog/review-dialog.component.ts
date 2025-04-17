import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../services/apis/review.service'; // ✅ thêm dòng này
import { IReview } from '../../interface/review.interface'; // ✅ thêm nếu chưa có

@Component({
  selector: 'app-review-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss'],
})
export class ReviewDialogComponent {
  rating = 5;
  comment = '';

  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reviewService: ReviewService // ✅ inject ReviewService
  ) {}

  submit() {
    const payload = {
      product_id: this.data.product.id, // ✅ Đảm bảo có dòng này
      rating: this.rating,
      content: this.comment
    };
  
    this.reviewService.createReview(payload).subscribe({
      next: () => {
        alert('Đánh giá thành công!');
        this.dialogRef.close();
      },
      error: (err) => {
        console.error('❌ Lỗi đánh giá:', err);
        alert('Gửi đánh giá thất bại.');
      }
    });
  }
  

  close() {
    this.dialogRef.close();
  }
}

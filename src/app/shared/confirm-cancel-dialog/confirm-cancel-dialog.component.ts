import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirm-cancel-dialog',
  standalone: true,
  templateUrl: './confirm-cancel-dialog.component.html',
  styleUrls: ['./confirm-cancel-dialog.component.scss'],
  imports: [
    CommonModule,  // Cần cho *ngIf, *ngFor
    MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, // Các module của Angular Material
    FormsModule  // Cần cho [(ngModel)]
  ]
})
export class ConfirmCancelDialogComponent {
  cancelReasons: string[] = [
    "Khách hàng đổi ý",
    "Đặt nhầm sản phẩm",
    "Thời gian giao hàng quá lâu",
    "Giá quá cao",
    "Tìm thấy sản phẩm rẻ hơn"
  ];
  
  selectedReason: string = '';
  customReason: string = '';
  isOtherReason: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmCancelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orderId: number }
  ) {}

  // ✅ Khi chọn lý do hủy, kiểm tra nếu là "Lý do khác"
  onReasonChange(value: string) {
    this.isOtherReason = value === 'other';
  }

  // ✅ Xác nhận hủy đơn hàng
  confirmCancel() {
    const finalReason = this.isOtherReason ? this.customReason : this.selectedReason;
    
    if (!finalReason.trim()) {
      alert("Vui lòng nhập lý do hủy!");
      return;
    }

    this.dialogRef.close(finalReason);
  }
}

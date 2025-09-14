import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-cancel-dialog',
  standalone: true,
  templateUrl: './confirm-cancel-dialog.component.html',
  styleUrls: ['./confirm-cancel-dialog.component.scss'],
  imports: [
    CommonModule,  
    MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule,
    FormsModule 
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
    @Inject(MAT_DIALOG_DATA)
    public data: { orderId: number, orderCode: string }, 
    private toastr: ToastrService
  ) {}

  onReasonChange(value: string) {
    this.isOtherReason = value === 'other';
  }

  confirmCancel() {
    const finalReason = this.isOtherReason ? this.customReason : this.selectedReason;

    if (!finalReason.trim()) {
      this.toastr.warning("Vui lòng nhập lý do hủy đơn!", "Cảnh báo");
      return;
    }

    this.dialogRef.close(finalReason);
  }
}


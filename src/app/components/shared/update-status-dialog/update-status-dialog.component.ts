import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'; // ✅ Thêm MatDialogModule

@Component({
  selector: 'app-update-status-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule // ✅ Fix lỗi `mat-dialog-content` và `mat-dialog-actions`
  ],
  templateUrl: './update-status-dialog.component.html',
  styleUrls: ['./update-status-dialog.component.scss']
})
export class UpdateStatusDialogComponent {
  statusList = [
    { label: 'Chờ xác nhận', value: 0 },
    { label: 'Đã xác nhận', value: 1 },
    { label: 'Đang giao', value: 2 },
    { label: 'Đã giao', value: 3 },
  ];

  selectedStatus: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<UpdateStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orderId: number, statusCode: number }
  ) {
    this.selectedStatus = data.statusCode ?? null;
  }
  

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.selectedStatus); // Trả selectedStatus là số
  }
}



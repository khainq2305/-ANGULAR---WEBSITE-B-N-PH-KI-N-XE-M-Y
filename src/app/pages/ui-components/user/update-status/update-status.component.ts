import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr'; // ✅ Thêm ToastrService

@Component({
  selector: 'app-update-status',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.scss']
})
export class UpdateStatusComponent implements OnInit {
  statusControl = new FormControl(this.data.status ?? 1);
  reasonControl = new FormControl('');
  customReasonControl = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<UpdateStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { status: number },
    private toastr: ToastrService 
  ) {
    this.onStatusChange();
  }

  ngOnInit() {
    this.statusControl.valueChanges.subscribe(() => {
      this.onStatusChange();
    });
  }

  onStatusChange() {
    this.reasonControl.setValue('');
    this.customReasonControl.setValue('');
  }

  onReasonChange() {
    if (this.reasonControl.value !== 'other') {
      this.customReasonControl.setValue('');
    }
  }

  updateStatus() {
    const status = this.statusControl.value ?? 1;
    let reason = this.reasonControl.value;

    if (status === 0) {
      if (!reason) {
        this.toastr.warning('Vui lòng chọn lý do tạm ngưng!', 'Cảnh báo');
        return;
      }

      if (reason === 'other') {
        const custom = this.customReasonControl.value?.trim();
        if (!custom) {
          this.toastr.warning('Vui lòng nhập lý do chi tiết!', 'Cảnh báo');
          return;
        }
        reason = custom;
      }
    } else {
      reason = null;
    }

    console.log('📤 Trả về dialogRef:', { status, reason });
    this.dialogRef.close({ status, reason });
  }
}

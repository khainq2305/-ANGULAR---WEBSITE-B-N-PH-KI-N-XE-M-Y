import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-handle-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],  // ✅ Thêm MatDialogModule
  templateUrl: './confirm-handle-dialog.component.html',
  styleUrls: ['./confirm-handle-dialog.component.scss']
})
export class ConfirmHandleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmHandleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  confirmHandle() {
    this.dialogRef.close(true);
  }
}

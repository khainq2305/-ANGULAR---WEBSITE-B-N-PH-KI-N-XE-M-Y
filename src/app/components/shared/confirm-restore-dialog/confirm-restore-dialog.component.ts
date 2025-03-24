import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-restore-dialog',
  standalone: true,
  templateUrl: './confirm-restore-dialog.component.html',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
})
export class ConfirmRestoreDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmRestoreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-reset-dialog',
  standalone: true,
  templateUrl: './confirm-reset-dialog.component.html',
  styleUrls: ['./confirm-reset-dialog.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ConfirmResetDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmResetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}
}

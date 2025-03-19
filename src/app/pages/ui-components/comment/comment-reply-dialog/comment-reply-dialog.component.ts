import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-reply-dialog',
  standalone: true,
  imports: [
    MatDialogModule, // ✅ Chỉ import MatDialogModule
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './comment-reply-dialog.component.html',
  styleUrls: ['./comment-reply-dialog.component.scss']
})
export class CommentReplyDialogComponent {
  replyText: string = '';

  constructor(
    public dialogRef: MatDialogRef<CommentReplyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitReply(): void {
    this.dialogRef.close(this.replyText);
  }
}

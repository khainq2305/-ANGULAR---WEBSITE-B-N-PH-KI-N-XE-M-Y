// src/app/components/shared/toast/toast.component.ts
import { Component, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  template: '', // dùng MatSnackBar nên không cần template
   styleUrls: ['.toast.component.scss']
})
export class ToastComponent {
  snackBar = inject(MatSnackBar);

  show(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000,
      panelClass: [`toast-${type}`],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ BẮT BUỘC để dùng pipe như "number"
@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './custom-toast.component.html',
  styleUrls: ['./custom-toast.component.scss'],
  standalone: true
})
export class ToastComponent {
  @Input() image!: string;
  @Input() name!: string;
  @Input() price!: number;
@Input() originalPrice: number = 0;

  @Input() visible = false;

  hideToast() {
    this.visible = false;
  }
}

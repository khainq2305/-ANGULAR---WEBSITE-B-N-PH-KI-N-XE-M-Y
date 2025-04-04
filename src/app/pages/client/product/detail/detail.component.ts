import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Thêm cái này
@Component({
  selector: 'app-detail',
  imports: [CommonModule], // <-- Fix lỗi ở đây
  standalone: true, // 👈 cần cái này
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
// ✅ Thêm các biến này để tránh lỗi
thumbs: string[] = [
  'https://via.placeholder.com/90',
  'https://via.placeholder.com/90',
  'https://via.placeholder.com/90'
];

labels: string[] = [
  'XL-THÂN K PIN SẠC',
  'XÁM-THÂN K PIN SẠC',
  'XL-BỘ 2pin10 CELL',
  'XÁM-BỘ 2pin10 CELL'
];

reviewImages: string[] = [
  'https://via.placeholder.com/60',
  'https://via.placeholder.com/60',
  'https://via.placeholder.com/60'
];
}

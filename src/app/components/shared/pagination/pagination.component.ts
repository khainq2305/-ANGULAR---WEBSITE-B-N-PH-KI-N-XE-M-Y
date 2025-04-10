import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 THÊM DÒNG NÀY

import { MatIconModule } from '@angular/material/icon'; // ✅ Import MatIconModule
@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule,MatIconModule], // 👈 THÊM DÒNG NÀY
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  pages: number[] = [];

  ngOnChanges(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(newPage: number): void {
    if (newPage < 1 || newPage > this.totalPages || newPage === this.currentPage) return;
    this.pageChange.emit(newPage);
  }
}

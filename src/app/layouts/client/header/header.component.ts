import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common'; // 💡 THÊM DÒNG NÀY

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf, CommonModule], // 💡 THÊM CommonModule
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  openSearch = false;

  toggleSearch() {
    this.openSearch = !this.openSearch;
    document.body.classList.toggle('modal-open', this.openSearch);
  }
}

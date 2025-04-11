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
  isLoggedIn = false;
  userEmail = '';
  userAvatar = ''; // 👈 thêm dòng này

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    this.isLoggedIn = !!token;
  
    if (this.isLoggedIn && email) {
      // 👉 Lấy phần trước dấu @
      this.userEmail = email.split('@')[0];
    }
  }
  

  logout() {
    localStorage.clear();
    window.location.reload(); // Hoặc điều hướng lại
  }
}

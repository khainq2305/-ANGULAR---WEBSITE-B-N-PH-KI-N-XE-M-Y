import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: `<h1>404 - Không tìm thấy route</h1><p>Đường: {{ currentUrl }}</p>`
})
export class NotFoundComponent {
  currentUrl = '';
  constructor(private router: Router) {
    this.currentUrl = router.url;
    console.log('URL sai:', this.currentUrl);
  }
}


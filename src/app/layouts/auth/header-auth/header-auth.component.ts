import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterModule } from '@angular/router'; // ✅ QUAN TRỌNG!

@Component({
  selector: 'app-header-auth',
  standalone: true,
  templateUrl: './header-auth.component.html',
  styleUrls: ['./header-auth.component.scss'],
  imports: [RouterModule] // ✅ THÊM DÒNG NÀY
})
export class HeaderAuthComponent implements OnInit {
  isLoginPage = false;
  isRegisterPage = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      this.isLoginPage = url.includes('dang-nhap');
      this.isRegisterPage = url.includes('dang-ky');
    });

    document.documentElement.classList.add('client-layout');
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderAuthComponent } from './header-auth/header-auth.component'; // header riêng
import { FooterComponent } from '../client/footer/footer.component';
@Component({
  selector: 'app-auth-layout',
  standalone: true,
  styleUrls: ['./auth.component.scss'],
  imports: [RouterOutlet, HeaderAuthComponent, FooterComponent],
  template: `
    <app-header-auth></app-header-auth>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `
})
export class AuthLayoutComponent {}

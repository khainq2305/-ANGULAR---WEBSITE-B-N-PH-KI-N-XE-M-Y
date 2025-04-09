import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-client-layout',
  standalone: true,
  templateUrl: './client.component.html',
  imports: [HeaderComponent, FooterComponent, RouterOutlet]
})
export class ClientLayoutComponent {ngOnInit() {
  document.documentElement.classList.add('client-layout');
}}

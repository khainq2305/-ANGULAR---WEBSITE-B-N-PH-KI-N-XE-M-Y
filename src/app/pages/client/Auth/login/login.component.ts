import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  phone: string = '';
  password: string = '';

  handleLogin() {
    console.log('Phone:', this.phone);
    console.log('Password:', this.password);
  }
}

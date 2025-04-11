import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientUserService } from 'src/app/services/apis/auth.service'; // Đường dẫn đúng file service
import { CommonModule } from '@angular/common'; // ✅ THÊM NÀY
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private userService: ClientUserService,
    private router: Router
  ) {}

  handleLogin() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.userService.login(loginData).subscribe(
      (res: any) => {

        console.log('✅ Đăng nhập thành công:', res);
        localStorage.setItem('token', `Bearer ${res.token}`); // ✅ Thêm "Bearer " vào token
        localStorage.setItem('email', res.email); // ✅ THÊM dòng này
    
        this.router.navigate(['/']);
      },
      err => {
        console.error('❌ Lỗi đăng nhập:', err);
        this.error = err.error?.message || 'Đăng nhập thất bại!';
      }
    );
    
  }
}

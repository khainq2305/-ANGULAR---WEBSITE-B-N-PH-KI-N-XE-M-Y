import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ClientUserService } from 'src/app/services/apis/auth.service'; // Đường dẫn đúng file service
import { CommonModule } from '@angular/common'; // ✅ THÊM NÀY
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  showPassword: boolean = false; // 👁

  constructor(
    private userService: ClientUserService,
    private router: Router
  ) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  handleLogin(loginForm: any) {
    // Nếu form không hợp lệ
    if (!loginForm.valid) {
      // Đánh dấu tất cả field là touched để hiện lỗi
      loginForm.controls['email']?.markAsTouched();
      loginForm.controls['password']?.markAsTouched();
      return;
    }
  
    // Nếu hợp lệ thì gửi request như cũ
    const loginData = {
      email: this.email,
      password: this.password
    };
  
    this.userService.login(loginData).subscribe(
      (res: any) => {
        localStorage.setItem('token', `Bearer ${res.token}`);
        localStorage.setItem('email', res.email);
        this.router.navigate(['/']);
      },
      err => {
        this.error = 'Tài khoản hoặc mật khẩu không chính xác';
      }
    );
  }
  
}


import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ClientUserService } from 'src/app/services/apis/auth.service'; 
import { CommonModule } from '@angular/common'; 
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
   
    if (!loginForm.valid) {
    
      loginForm.controls['email']?.markAsTouched();
      loginForm.controls['password']?.markAsTouched();
      return;
    }
  
 
    const loginData = {
      email: this.email,
      password: this.password
    };
  
    this.userService.login(loginData).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token); 

        localStorage.setItem('email', res.email);
        localStorage.setItem('role', res.role); 
    
        if (res.role === 1) {
          this.router.navigate(['/admin']); 
        } else {
          this.router.navigate(['/']); 
        }
      },
      err => {
        if (err.status === 403 && err.error?.message.includes('khóa')) {
          this.error = 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.';
        } else {
          this.error = 'Tài khoản hoặc mật khẩu không chính xác';
        }
      }
      
    );
    
  }
  
}


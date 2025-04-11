import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientUserService } from 'src/app/services/apis/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private userService: ClientUserService,  private toastr: ToastrService  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.matchPassword });
  }

  get f() {
    return this.registerForm.controls;
  }

  matchPassword(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  handleRegister() {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    // ✅ Chỉ gửi email & password (KHÔNG name, confirmPassword)
    const { email, password } = this.registerForm.value;

    this.userService.register({ email, password }).subscribe(
      res => {
        console.log("✅ Đăng ký thành công", res);
        this.toastr.success('Đăng ký thành công!', '', {
          positionClass: 'toast-center-center' // 👈 custom vị trí
        });
        
        // TODO: redirect nếu cần
      },
      err => {
        console.error("❌ Lỗi đăng ký:", err);
        this.toastr.error(err.error?.message || 'Đăng ký thất bại!', 'Lỗi'); // 👈 TOAST LỖI
      }
    );
    
  }
}

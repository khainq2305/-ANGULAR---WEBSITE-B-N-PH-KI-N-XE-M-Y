import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientUserService } from 'src/app/services/apis/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm!: FormGroup;
  submitted = false;
  showPassword = false;
  showConfirm = false;

  constructor(
    private fb: FormBuilder,
    private userService: ClientUserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.matchPassword }
    );
  }

  get f() {
    return this.registerForm.controls; // Truy cập nhanh các form control trong template HTML (f.email, f.password, ...)
  }

  matchPassword(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;

    return pass === confirm ? null : { passwordMismatch: true };
  }

  togglePassword(field: 'password' | 'confirm') {
    if (field === 'password') this.showPassword = !this.showPassword;

    if (field === 'confirm') this.showConfirm = !this.showConfirm;
  }

  handleRegister() {
    this.submitted = true;

    if (this.registerForm.invalid) return;

    const { email, password } = this.registerForm.value;
    this.userService.register({ email, password }).subscribe(
      (res) => {
        this.toastr.success('Đăng ký thành công!', 'Thành công');

        this.router.navigate(['/dang-nhap']);
      },
      (err) => {
        this.toastr.error(err.error?.message || 'Đăng ký thất bại!', 'Lỗi');
      }
    );
  }
}

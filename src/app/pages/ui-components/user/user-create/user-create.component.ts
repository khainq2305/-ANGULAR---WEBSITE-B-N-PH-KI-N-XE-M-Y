import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UserService } from 'src/app/services/apis/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {
  userForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router,  private toastr: ToastrService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,12}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required],
      dob: ['', Validators.required]
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    Object.entries(this.userForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    formData.set('gender', this.mapGender(this.userForm.value.gender));

    if (this.selectedFile) {
      formData.append('avatar', this.selectedFile);
    }

    this.userService.createUser(formData).subscribe({
      next: () => {
        this.toastr.success('Thêm người dùng thành công', 'Thành công');
        this.router.navigate(['/admin/users']);
      },
      error: (err) => {
        console.error('❌ Lỗi tạo người dùng:', err);
        alert('Tạo người dùng thất bại!');
      }
    });
  }

  mapGender(genderVi: string): string {
    switch (genderVi) {
      case 'Nam': return 'male';
      case 'Nữ': return 'female';
      case 'Khác': return 'other';
      default: return '';
    }
  }
}

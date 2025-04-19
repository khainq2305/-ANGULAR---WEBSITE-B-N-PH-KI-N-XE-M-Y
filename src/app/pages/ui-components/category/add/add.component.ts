import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { EditorComponent } from 'src/app/components/editor/editor.component';
import { CommonModule } from '@angular/common';
import { CategoryService } from 'src/app/services/apis/category.service';
import { ICategory } from 'src/app/interface/category.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    EditorComponent,
  ],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit{
  categoryForm: FormGroup;
  selectedFile: string | File | null = null;
  selectedFileName: string = '';
  selectedFilePreview: string | null = null;
  public description: string = '';
  public isSubmitted: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
  }
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      imageUrl: ['', Validators.required],
      status: [null, Validators.required],
    });
    
    // Ensure the form starts in a pristine and untouched state
    this.categoryForm.markAsPristine();
    this.categoryForm.markAsUntouched();
  }
  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFile = file;
        this.selectedFilePreview = reader.result as string;
        this.selectedFileName = file.name;
        this.categoryForm.patchValue({ imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.selectedFile = null;
    this.selectedFileName = '';
    this.categoryForm.patchValue({ imageUrl: null });
  }

  onDescriptionChange(value: string) {
    this.description = value;
    this.categoryForm.patchValue({ description: value });
  }

  addCategory() {
    const formData = new FormData();
    const name = this.categoryForm.get('name')?.value;
    const status = this.categoryForm.get('status')?.value;
    const description = this.categoryForm.get('description')?.value;
  
    console.log("FormData đang gửi:", { name, status, description, selectedFile: this.selectedFile });
  
    if (!name || !status) return;
  
    formData.append('name', name.trim());
    formData.append('status', String(status));
    formData.append('description', description || '');
  
    if (this.selectedFile instanceof File) {
      formData.append('image', this.selectedFile, this.selectedFileName);
    }
  
    this.categoryService.addCategory(formData).subscribe({
      next: () => {
        this.toastr.success('Tạo danh mục thành công!');
        this.router.navigate(['/admin/ui-components/category/list']);
      },
      error: (err) => {
        console.error("❌ Thêm danh mục thất bại:", err);
        this.toastr.error('Có lỗi xảy ra khi tạo danh mục!');
      }
    });
  }
  

  resetForm() {
    this.categoryForm.reset({
      name: '',
      description: '',
      imageUrl: '',
      status: null,
    });
  
    Object.keys(this.categoryForm.controls).forEach((key) => {
      const control = this.categoryForm.get(key);
      control?.markAsPristine();
      control?.markAsUntouched();
      control?.updateValueAndValidity();
    });
  
    this.selectedFile = null;
    this.selectedFileName = '';
    this.selectedFilePreview = null;
    this.description = '';
  
    // Reset biến này để không hiển thị lỗi trên form mới
    this.isSubmitted = false;
    
    setTimeout(() => {
      this.categoryForm.updateValueAndValidity();
    }, 0);
  }
  
  


  onSubmit() {
    this.isSubmitted = true;
    console.log("Form values:", this.categoryForm.value);
    if (this.categoryForm.invalid) {
      this.toastr.error('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    this.addCategory();
  }
  
  
}

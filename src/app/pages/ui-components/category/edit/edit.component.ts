import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { EditorModule } from '@tinymce/tinymce-angular';

import { CategoryService } from 'src/app/services/apis/category.service';
import { ICategory } from 'src/app/interface/category.interface';
import { EditorComponent } from "../../../../components/editor/editor.component";
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    EditorModule,
    EditorComponent
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  categoryForm: FormGroup;
  selectedFileName = '';
  selectedImage: string | null = null;
  selectedFilePreview: string | null = null;
  description = '';
  apiUrlImage:string = API_ENDPOINT.category.uploads;
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      imageUrl: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoryService.getCategoryById(Number(id)).subscribe({
        next: (res: any) => {
          const category = res.data;

          this.categoryForm.patchValue({
            name: category.name,
            description: category.description,
            imageUrl: category.imageUrl,
            status: category.status,
          });

          this.description = category.description;

          if (category.imageUrl) {
            this.selectedImage = category.imageUrl.startsWith('http')
              ? category.imageUrl
              : `${this.apiUrlImage}/${category.imageUrl}`; ;
              console.log(this.apiUrlImage + category.imageUrl);
            this.selectedFileName = category.imageUrl.split('/').pop() || category.imageUrl;
            this.selectedFilePreview = this.selectedImage;
          }
        },
        error: () => {
          this.toastr.error('Lỗi khi tải danh mục');
          // TODO: Thêm xử lý lỗi nếu cần
        }
      });
    }
  }

  onImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.selectedFilePreview = reader.result as string;
      this.selectedImage = reader.result as string;
      this.categoryForm.patchValue({ imageUrl: this.selectedImage });
    };
    reader.readAsDataURL(file);
    this.selectedFileName = file.name;

  }

  removeImage() {
    this.selectedImage = null;
    this.selectedFileName = '';
    this.selectedFilePreview = null;
    this.categoryForm.patchValue({ imageUrl: null });
  }

  stripHtmlTags(input: string): string {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.body.textContent || "";
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      this.toastr.error('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const formData = { ...this.categoryForm.value };
    formData.description = this.stripHtmlTags(this.description);

    if (this.selectedImage?.includes('/uploads/')) {
      formData.imageUrl = this.selectedImage.split('/uploads/').pop();
    } else if (this.selectedFileName) {
      formData.imageUrl = this.selectedFileName;
    }

    this.updateCategory(formData);
  }

  updateCategory(formData: ICategory) {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    const { id: _, ...rest } = formData;
    const categoryData = { id: Number(id), ...rest };

    this.categoryService.updateCategory(categoryData).subscribe({
      next: () => {
        this.selectedImage = null;
        this.selectedFileName = '';
        this.toastr.success('Cập nhật danh mục thành công!');
        setTimeout(() => {
          this.router.navigate(['/admin/ui-components/category/list']);
        }, 2000);
        // TODO: Điều hướng hoặc hiển thị thông báo thành công
      },
      error: () => {
        this.toastr.error('Có lỗi xảy ra khi cập nhật danh mục!');
        // TODO: Thêm xử lý lỗi nếu cần
      }
    });
  }

  // TODO: Xem lại nếu bạn không cần biến này nữa
  // [x: string]: any;
}

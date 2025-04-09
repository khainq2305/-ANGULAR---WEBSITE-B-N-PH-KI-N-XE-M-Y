import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CommonModule } from '@angular/common';
import { CategoryService } from 'src/app/services/apis/category.service';
import { EditorComponent } from "../../../../components/editor/editor.component";

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatSelectModule,
    MatIconModule,
    EditorModule,
    CommonModule,
    EditorComponent
],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  categoryForm: FormGroup;
  selectedFileName: string = '';
  selectedImage: string | null = null;
  public description: string = '';

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      imageUrl: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
        this.categoryForm.patchValue({ imageUrl: this.selectedImage });
      };
      reader.readAsDataURL(file);
      this.selectedFileName = file.name;
    }
  }

  removeImage() {
    this.selectedImage = null;
    this.selectedFileName = '';
    this.categoryForm.patchValue({ imageUrl: null });
  }

  updateCategory(formData: {
    id: number;
    name: string;
    description: string;
    status: number;
    imageUrl: string | null;
    
  }) {
    const id = this.route.snapshot.paramMap.get('id');
    const { id: _, ...restFormData } = formData;
    const categoryData = { id: Number(id), ...restFormData };
    console.log('Form Data ID from URL:', id);
    console.log('Form Data:', categoryData);
    this.categoryService.updateCategory(categoryData).subscribe({
      next: (res: any) => {
        console.log('Category updated successfully', res);
        this.selectedImage = null;
        this.selectedFileName = '';
        this.categoryForm.reset({ status: 1 });
      },
      error: (err: any) => {
        console.error('Error updating category', err);
      }
    });
  }
  

  onSubmit() {
    console.log('Submit pressed'); // <-- thêm dòng này
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      console.log('Form is invalid'); // <-- thêm dòng này
      return;
    }
    const formData = this.categoryForm.value;
    this.updateCategory(formData);
  }
}

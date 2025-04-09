import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
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
export class AddComponent {
  categoryForm: FormGroup;
  selectedFileName: string = '';
  selectedImage: string | null = null;
  public description: string = '';

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
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

  addCategory(formData: {
    name: string;
    description: string;
    status: number;
    imageUrl: string | null;
  }) {
    this.categoryService.addCategory({ id: 0, ...formData }).subscribe({
      next: (res) => {
        console.log('Category added successfully', res);
        this.selectedImage = null;
        this.selectedFileName = '';
        this.categoryForm.reset({ status: 1 });
      },
      error: (err) => {
        console.error('Error adding category', err);
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
    this.addCategory(formData);
  }
  
}

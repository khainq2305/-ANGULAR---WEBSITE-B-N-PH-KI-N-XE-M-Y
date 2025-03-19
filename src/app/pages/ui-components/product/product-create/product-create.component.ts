import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatIconModule,
    MatChipsModule,
    EditorModule
  ],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent {
  public categories = signal<string[]>(['Pô xe', 'Phụ kiện', 'Đèn xe']);
  public selectedCategories = signal<string[]>([]);
  public isAddingCategory = signal(false);
  public newCategory = signal('');

  // Cấu hình TinyMCE
  public editorConfig = {
    height: 300,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar:
      'undo redo | formatselect | bold italic backcolor | ' +
      'alignleft aligncenter alignright alignjustify | ' +
      'bullist numlist outdent indent | removeformat | help'
  };

  // Mở form nhập danh mục
  openCategoryForm() {
    this.isAddingCategory.set(true);
  }

  closeCategoryForm() {
    this.isAddingCategory.set(false);
    this.newCategory.set('');
  }

  addCategory() {
    if (this.newCategory() && !this.categories().includes(this.newCategory())) {
      this.categories.update((categories) => [...categories, this.newCategory()]);
      this.selectedCategories.update((selected) => [...selected, this.newCategory()]);
      this.newCategory.set('');
    }
    this.isAddingCategory.set(false);
  }

  public productMedia: any[] = [];
  public productThumbnail: any = null;

  onCategorySelect(event: any) {
    if (!this.selectedCategories().includes(event.value)) {
      this.selectedCategories.update((selected) => [...selected, event.value]);
    }
  }

  removeCategory(category: string) {
    this.selectedCategories.update((selected) => selected.filter(c => c !== category));
  }
  updateNewCategory(event: Event) {
    const inputElement = event.target as HTMLInputElement; // ✅ Ép kiểu đúng
    this.newCategory.set(inputElement.value);
  }
  
  // Xử lý upload ảnh
  onImageUpload(event: any, type: string) {
    if (event.target.files.length) {
      for (let file of event.target.files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const fileData = {
            name: file.name,
            size: file.size,
            url: reader.result as string,
            type: file.type.startsWith('image')
              ? 'image'
              : file.type.startsWith('video')
              ? 'video'
              : 'file'
          };

          if (type === 'thumbnail') {
            this.productThumbnail = fileData;
          } else {
            this.productMedia.push(fileData);
          }
        };
      }
    }
  }
}

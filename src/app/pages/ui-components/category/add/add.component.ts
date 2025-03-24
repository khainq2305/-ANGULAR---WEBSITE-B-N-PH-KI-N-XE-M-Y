import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { EditorComponent } from 'src/app/components/editor/editor.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add',
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
    EditorComponent, 

    CommonModule
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  selectedFileName: string = '';
  public categoryImages: string[] = [];
 
  selectedImage: string | null = null;

onImageUpload(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.selectedFileName = file.name;
  }
}

  public description: string = '';
removeImage() {
  this.selectedImage = null;
  this.selectedFileName = '';
}

}

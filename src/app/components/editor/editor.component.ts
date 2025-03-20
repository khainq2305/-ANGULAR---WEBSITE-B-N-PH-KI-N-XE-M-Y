import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ✅ Import CKEditor đúng cách
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-editor',
  standalone: true,
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  imports: [CommonModule, FormsModule, CKEditorModule] // ✅ Fix lỗi imports
})
export class EditorComponent {
  public Editor = ClassicEditor;  

  @Input() data: string = '';
  @Output() dataChange = new EventEmitter<string>();

  onChange(event: any) {
    this.dataChange.emit(event);
  }
}

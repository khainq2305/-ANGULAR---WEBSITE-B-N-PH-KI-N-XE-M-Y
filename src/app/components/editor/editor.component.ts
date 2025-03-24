import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, EditorModule],
  template: `
    <editor
      [init]="editorConfig"
      [(ngModel)]="data"
      (ngModelChange)="onChange($event)">
    </editor>
  `,
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  @Input() data: string = ''; 
  @Output() dataChange = new EventEmitter<string>(); 

  editorConfig = {
    menubar: false,
    base_url: '/assets/tinymce',
    skin_url: '/assets/tinymce/skins/ui/oxide',
    content_css: '/assets/tinymce/skins/content/default/content.css',
    icons: '/assets/tinymce/icons/default',
    plugins: 'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount',
    toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
  };
  
  

  onChange(event: any) {
    this.dataChange.emit(event);
  }
}

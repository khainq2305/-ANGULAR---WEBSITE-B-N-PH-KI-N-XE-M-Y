import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnChanges {
  @Input() appHighlight: string | number = ''; // Văn bản gốc
  @Input() searchText: string = '';   // Từ khóa tìm kiếm

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    let text = this.appHighlight ? String(this.appHighlight) : '';
    let keyword = this.searchText ? String(this.searchText).trim() : '';

    if (!keyword) {
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', text);
      return;
    }

    // Nếu là số, chuyển thành chuỗi
    if (typeof this.appHighlight === 'number') {
      text = String(this.appHighlight);
    }

    // Tạo regex để tìm kiếm chính xác
    const regex = new RegExp(`(${keyword})`, 'gi');
    const highlightedText = text.replace(regex, `<mark>$1</mark>`);

    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', highlightedText);
  }
}

import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnChanges {
  @Input() appHighlight: string | number = '';
  @Input() searchText: string = ''; 

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    let text = this.appHighlight ? String(this.appHighlight) : '';
    let keyword = this.searchText ? String(this.searchText).trim() : '';

    if (!keyword) {
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', text);
      return;
    }

   
    if (typeof this.appHighlight === 'number') {
      text = String(this.appHighlight);
    }

   
    const regex = new RegExp(`(${keyword})`, 'gi');
    const highlightedText = text.replace(regex, `<mark>$1</mark>`);

    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', highlightedText);
  }
}

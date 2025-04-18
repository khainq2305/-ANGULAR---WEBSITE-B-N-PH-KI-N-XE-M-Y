import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-top-search',
  templateUrl: './top-search.component.html',
  styleUrls: ['./top-search.component.scss'],
  imports: [CommonModule],
})
export class TopSearchComponent {
  topSearchItems = [
    { name: 'Loa Vi Tính', sold: '9k+', image: 'https://down-vn.img.susercontent.com/file/de1406636add66be2557c332197df4de' },
    { name: 'Máy Xay Cầm Tay', sold: '11k+', image: 'https://down-vn.img.susercontent.com/file/d292ba85a18227ae5512656bea43528d' },
    { name: 'Áo Khoác Blazer Nam', sold: '3k+', image: 'https://down-vn.img.susercontent.com/file/de1406636add66be2557c332197df4de' },
    { name: 'Máy Hút Bụi Deerma', sold: '6k+', image: 'https://down-vn.img.susercontent.com/file/f9b6657256966e0998b64de073da7ca6' },
    { name: 'Máy Xay Sinh Tố Cầm Tay', sold: '9k+', image: 'https://down-vn.img.susercontent.com/file/de1406636add66be2557c332197df4de' },
    { name: 'Máy Hút Bụi', sold: '7k+', image: 'https://down-vn.img.susercontent.com/file/2eba3ae2a6da2c9569337a6649a0d4a1' },
    // thêm sản phẩm khác nếu cần
  ];
}

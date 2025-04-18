import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-category-section',
  templateUrl: './category-section.component.html',
  styleUrls: ['./category-section.component.scss'],
 
    imports: [
      CommonModule,
      
    ]
  
})
export class CategorySectionComponent {
  categories = [
    {
      name: 'Thời Trang Nam',
      image: 'https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w640_nl.webp',
    },
    {
      name: 'Điện Thoại & Phụ Kiện',
      image: 'https://down-vn.img.susercontent.com/file/31234a27876fb89cd522d7e3db1ba5ca@resize_w640_nl.webp',
    },
    {
      name: 'Thiết Bị Điện Tử',
      image: 'https://down-vn.img.susercontent.com/file/978b9e4cb61c611aaaf58664fae133c5@resize_w640_nl.webp',
    },
    {
      name: 'Máy Tính & Laptop',
      image: 'https://down-vn.img.susercontent.com/file/c3f3edfaa9f6dafc4825b77d8449999d@resize_w640_nl.webp',
    },
    {
      name: 'Máy Ảnh & Quay Phim',
      image: 'https://down-vn.img.susercontent.com/file/ec14dd4fc238e676e43be2a911414d4d@resize_w640_nl.webp',
    },
    {
      name: 'Đồng Hồ',
      image: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260@resize_w640_nl.webp',
    },
    {
      name: 'Giày Dép Nam',
      image: 'https://down-vn.img.susercontent.com/file/74ca517e1fa74dc4d974e5d03c3139de@resize_w640_nl.webp',
    },
    {
      name: 'Thiết Bị Điện Gia Dụng',
      image: 'https://down-vn.img.susercontent.com/file/7abfbfee3c4844652b4a8245e473d857@resize_w640_nl.webp',
    },
    {
      name: 'Thể Thao & Du Lịch',
      image: 'https://down-vn.img.susercontent.com/file/6cb7e633f8b63757463b676bd19a50e4@resize_w640_nl.webp',
    },
    {
      name: 'Ô Tô & Xe Máy',
      image: 'https://down-vn.img.susercontent.com/file/3fb459e3449905545701b418e8220334@resize_w640_nl.webp',
    },
    {
      name: 'Thời Trang Nữ',
      image: 'https://down-vn.img.susercontent.com/file/75ea42f9eca124e9cb3cde744c060e4d@resize_w640_nl.webp',
    },
    {
      name: 'Mẹ & Bé',
      image: 'https://down-vn.img.susercontent.com/file/099edde1ab31df35bc255912bab54a5e@resize_w640_nl.webp',
    },
    {
      name: 'Nhà Cửa & Đời Sống',
      image: 'https://down-vn.img.susercontent.com/file/24b194a695ea59d384768b7b471d563f@resize_w640_nl.webp',
    },
    {
      name: 'Sắc Đẹp',
      image: 'https://down-vn.img.susercontent.com/file/ef1f336ecc6f97b790d5aae9916dcb72@resize_w640_nl.webp',
    },
    {
      name: 'Sức Khỏe',
      image: 'https://down-vn.img.susercontent.com/file/49119e891a44fa135f5f6f5fd4cfc747@resize_w640_nl.webp',
    },
    {
      name: 'Giày Dép Nữ',
      image: 'https://down-vn.img.susercontent.com/file/48630b7c76a7b62bc070c9e227097847@resize_w640_nl.webp',
    },
    {
      name: 'Túi Ví Nữ',
      image: 'https://down-vn.img.susercontent.com/file/fa6ada2555e8e51f369718bbc92ccc52@resize_w640_nl.webp',
    },
    {
      name: 'Phụ Kiện & Trang Sức',
      image: 'https://down-vn.img.susercontent.com/file/8e71245b9659ea72c1b4e737be5cf42e@resize_w640_nl.webp',
    },
    {
      name: 'Bách Hóa Online',
      image: 'https://down-vn.img.susercontent.com/file/c432168ee788f903f1ea024487f2c889@resize_w640_nl.webp',
    },
    {
      name: 'Nhà Sách Online',
      image: 'https://down-vn.img.susercontent.com/file/36013311815c55d303b0e6c62d6a8139@resize_w640_nl.webp',
    },
  ];
}

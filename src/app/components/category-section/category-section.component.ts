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
      image: 'https://down-vn.img.susercontent.com/file/089b2aef20fa08978a3ff6e887c6b7df',
    },
    {
      name: 'Thiết Bị Điện Tử',
      image: 'https://down-vn.img.susercontent.com/file/7d6c1ad3a90c3a15c5f7c486f23792fc',
    },
    {
      name: 'Máy Tính & Laptop',
      image: 'https://down-vn.img.susercontent.com/file/9dc1cfb895cd321b9e6a9c4f3bbebdd9',
    },
    {
      name: 'Máy Ảnh & Quay Phim',
      image: 'https://down-vn.img.susercontent.com/file/2f3dd89df159c6a5fc5196c5d76f9a84',
    },
    {
      name: 'Đồng Hồ',
      image: 'https://down-vn.img.susercontent.com/file/cb2a0e3cf6b9022db3d45a9ea65e49a4',
    },
    {
      name: 'Giày Dép Nam',
      image: 'https://down-vn.img.susercontent.com/file/e4298a9dfc755cf7b937b8aaf60d6233',
    },
    {
      name: 'Thiết Bị Điện Gia Dụng',
      image: 'https://down-vn.img.susercontent.com/file/86a7cf52e0c416c598bcf7df02ab35b7',
    },
    {
      name: 'Thể Thao & Du Lịch',
      image: 'https://down-vn.img.susercontent.com/file/5911fc2e64e32d2280e53a5425d09b87',
    },
    {
      name: 'Ô Tô & Xe Máy',
      image: 'https://down-vn.img.susercontent.com/file/3a06cc36b0a9b94c9600b949b353cd10',
    },
    {
      name: 'Thời Trang Nữ',
      image: 'https://down-vn.img.susercontent.com/file/d61bc68a34b42a8d05a0141653c8d234',
    },
    {
      name: 'Mẹ & Bé',
      image: 'https://down-vn.img.susercontent.com/file/994a468be14be2c4e5c8696b5b8b90e1',
    },
    {
      name: 'Nhà Cửa & Đời Sống',
      image: 'https://down-vn.img.susercontent.com/file/d5aa6dff3fcaeacc8c330a8b94d86043',
    },
    {
      name: 'Sắc Đẹp',
      image: 'https://down-vn.img.susercontent.com/file/282bd8c03016557fc2d9eb4d2f5fc8b2',
    },
    {
      name: 'Sức Khỏe',
      image: 'https://down-vn.img.susercontent.com/file/84120489337627622821b2c962ca08c7',
    },
    {
      name: 'Giày Dép Nữ',
      image: 'https://down-vn.img.susercontent.com/file/121e2e2b121bdce8e90cf1f308f1745d',
    },
    {
      name: 'Túi Ví Nữ',
      image: 'https://down-vn.img.susercontent.com/file/38adf52f25e6ec3c3de5aa999c080cd0',
    },
    {
      name: 'Phụ Kiện & Trang Sức',
      image: 'https://down-vn.img.susercontent.com/file/8012dba54073e6dba2166b1b4084b97e',
    },
    {
      name: 'Bách Hóa Online',
      image: 'https://down-vn.img.susercontent.com/file/5016a6c49f434da7c2a24b056bcc1b3b',
    },
    {
      name: 'Nhà Sách Online',
      image: 'https://down-vn.img.susercontent.com/file/7b4c44c9492de9b5ff9d2e15e7c5ef1c',
    },
  ];
}

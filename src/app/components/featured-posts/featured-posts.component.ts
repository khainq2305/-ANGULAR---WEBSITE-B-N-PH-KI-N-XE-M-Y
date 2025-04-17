import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-posts.component.html',
  styleUrls: ['./featured-posts.component.scss'],
})
export class FeaturedPostsComponent {
  topPosts1 = [
    {
      img: 'assets/client/img/home/ChatGPT Image 22_12_45 13 thg 4, 2025.png',
      date: '19/09/2023',
      title: 'TRUNG THU NÀY, SAO BẠN KHÔNG TỰ CHIẾU?',
      desc: 'Bạn đã từng nghe: Trung thu thôi mà, có gì đâu mà chơi...'
    },
    {
      img: 'assets/client/img/home/ChatGPT Image 22_15_05 13 thg 4, 2025.png',
      date: '16/01/2023',
      title: 'BỘ SƯU TẬP CẦU TOÀN KÈO THÔM: "VÍA"...',
      desc: 'Tết này vẫn giống Tết xưa, nhưng thêm nhiều hoạt động xin vía hiện đại...'
    },
    {
      img: 'assets/client/img/home/ChatGPT Image 22_19_49 13 thg 4, 2025.png',
      date: '16/08/2022',
      title: '“KHUẪY ĐỂ THẤY TRĂNG" - KHUẪY LÊN...',
      desc: 'Trung thu 2022 rộn rã, vui vẻ cùng bạn bè, trải nghiệm mới mẻ...'
    }
  ];

  topPosts2 = [
    {
      img: 'assets/client/img/home/ChatGPT Image 22_17_31 13 thg 4, 2025.png',
      date: '05/08/2022',
      title: 'THỨ GIẢI XANH ĐÈN SÁNG – GIẢI NHIỆT CĂNG HƠI',
      desc: 'Lấy cảm hứng từ màu xanh mát, mang đến trải nghiệm thanh mát ngày hè.'
    },
    {
      img: 'assets/client/img/home/ChatGPT Image 22_29_15 13 thg 4, 2025.png',
      date: '10/07/2022',
      title: 'TRÀ SỮA HÈ RỰC - VÀI NGÀY TRÀ MÁT',
      desc: 'Đủ ngọt ngào, đủ thơm ngon - combo trà sữa và trái cây tươi mát.'
    },
    {
      img: 'assets/client/img/home/ChatGPT Image 22_15_05 13 thg 4, 2025.png',
      date: '20/06/2022',
      title: 'CHILL THÂU HÈ VỚI SIRO TRÁI CÂY',
      desc: 'Thư giãn cảm xúc, refresh bản thân bằng sự tươi mới của sữa và hoa quả.'
    }
  ];
}

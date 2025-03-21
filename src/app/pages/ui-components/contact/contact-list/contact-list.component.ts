import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmHandleDialogComponent } from 'src/app/components/shared/confirm-handle-dialog/confirm-handle-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip'; // 🔥 Thêm dòng này
import { MessageDialogComponent } from 'src/app/components/shared/message-dialog/message-dialog.component';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatTableModule, 
    MatIconModule, MatButtonModule, MatInputModule, 
    FormsModule, MatMenuModule, MatTooltipModule, MatSelectModule
  ],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
  searchQuery: string = ''; 

  displayedColumns = ['name', 'email', 'phone', 'message', 'status', 'actions'];

  contacts = [
    { 
      name: 'Nguyễn Văn A', 
      email: 'nguyenvana@example.com', 
      phone: '0123 456 789',
      message: 'Tôi muốn hỏi về sản phẩm mới.',
      status: 'Chưa xử lý' 
    },
    { 
      name: 'Trần Thị B', 
      email: 'tranthib@example.com', 
      phone: '0987 654 321',
      message: 'Đơn hàng của tôi bị trễ, có thể kiểm tra giúp không?',
      status: 'Đã phản hồi' 
    },
    { 
      name: 'Lê Văn C', 
      email: 'khainqpc08388@gmail.com', 
      phone: '0912 345 678',
      message: 'Tôi cần báo giá số lượng lớn.',
      status: 'Chưa xử lý' 
    }
  ];

  filteredContacts = [...this.contacts];

  constructor(public dialog: MatDialog) {}

  // 🔍 Lọc danh sách theo từ khóa
  filterContacts() {
    this.filteredContacts = this.contacts.filter(contact => 
      contact.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // ✅ Mở hộp thoại xác nhận xử lý liên hệ
  openConfirmHandleDialog(contact: any) {
    const dialogRef = this.dialog.open(ConfirmHandleDialogComponent, {
      width: '400px',
      data: { name: contact.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        contact.status = 'Đã phản hồi'; 
        console.log(`Liên hệ từ ${contact.name} đã được xử lý.`);
      }
    });
  }

  // ✅ Gửi phản hồi email
  sendEmail(contact: any) {
    const emailSubject = encodeURIComponent(`Phản hồi liên hệ từ ${contact.name}`);
    const emailBody = encodeURIComponent(
      `Chào ${contact.name},\n\nCảm ơn bạn đã liên hệ với chúng tôi.\n\nBạn đã gửi tin nhắn:\n"${contact.message}"\n\nChúng tôi sẽ phản hồi sớm nhất.\n\nTrân trọng,\nĐội ngũ hỗ trợ`
    );

    setTimeout(() => {
      window.location.href = `mailto:${contact.email}?subject=${emailSubject}&body=${emailBody}`;
    }, 300);
  }
  // 🆕 Hàm mở hộp thoại hiển thị nội dung
openMessageDialog(contact: any) {
  this.dialog.open(MessageDialogComponent, {
    width: '400px',
    data: { message: contact.message }
  });
}
}

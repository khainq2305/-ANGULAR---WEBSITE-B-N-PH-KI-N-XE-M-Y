import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommentReplyDialogComponent } from '../comment-reply-dialog/comment-reply-dialog.component';


@Component({
  selector: 'app-comment-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule, // ✅ Thêm MatDialog để hiển thị form phản hồi dạng dialog
    FormsModule,
    CommentReplyDialogComponent,
    
  ],
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.scss']
})
export class CommentDetailComponent implements OnInit {
  productId!: number;
  productName: string = '';
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['stt', 'avatar', 'user', 'rating', 'content', 'date', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  showReplyForm: { [key: number]: boolean } = {};
  replyInput: { [key: number]: string } = {};
  ratingOptions = [
    { value: 5, label: '5 sao' },
    { value: 4, label: '4 sao' },
    { value: 3, label: '3 sao' },
    { value: 2, label: '2 sao' },
    { value: 1, label: '1 sao' }
  ];
  
  selectedRating: string | number = 'all';
  searchText: string = '';

  commentsData: Record<number, { 
    productName: string;
    comments: { 
      id: number;
      user: string;
      avatar: string;
      rating: number;
      content: string;
      date: string;
    }[];
  }> = {
    1: {
      productName: 'Đĩa Kingspeed 260mm',
      comments: [
        { id: 101, user: 'Nguyễn Văn A', avatar: 'https://i.pravatar.cc/50?img=1', rating: 5, content: 'Sản phẩm rất tốt!', date: '2024-03-19' },
        { id: 102, user: 'Trần Thị B', avatar: 'https://i.pravatar.cc/50?img=2', rating: 4, content: 'Hàng đẹp, sẽ mua lần sau!', date: '2024-03-20' },
      ]
    }
  };

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      const productData = this.commentsData[this.productId];

      if (productData) {
        this.productName = productData.productName;
        this.dataSource.data = productData.comments;
      } else {
        this.productName = 'Sản phẩm không tồn tại';
        this.dataSource.data = [];
      }
    });
  }

  applyFilter() {
    let filteredData = [...this.commentsData[this.productId]?.comments || []];

    if (this.selectedRating !== 'all') {
      filteredData = filteredData.filter(comment => comment.rating === this.selectedRating);
    }

    if (this.searchText.trim()) {
      filteredData = filteredData.filter(comment =>
        comment.content.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    this.dataSource.data = filteredData;
    this.dataSource.paginator?.firstPage();
  }


  openReplyDialog(comment: any) {
    const dialogRef = this.dialog.open(CommentReplyDialogComponent, {
      width: '500px',
      data: { user: comment.user }  // ✅ Truyền dữ liệu user
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`Phản hồi từ ${comment.user}: ${result}`);
      }
    });
  }
  

  submitReply(commentId: number) {
    const replyContent = this.replyInput[commentId]?.trim();
    if (replyContent) {
      console.log(`Reply for comment ${commentId}: ${replyContent}`);
      this.replyInput[commentId] = ''; // Reset nội dung phản hồi sau khi gửi
      this.showReplyForm[commentId] = false; // Ẩn form sau khi gửi
    }
  }
  toggleReplyForm(commentId: number) {
    if (!this.showReplyForm) {
        this.showReplyForm = {};
    }
    this.showReplyForm[commentId] = !this.showReplyForm[commentId];
}

}

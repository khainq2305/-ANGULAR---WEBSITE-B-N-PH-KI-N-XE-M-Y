import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private refreshTrigger = new Subject<void>();
  private checkCommentSubject = new Subject<void>();
  private resetViewSubject = new Subject<void>
  refresh$ = this.refreshTrigger.asObservable()
  commentChecked$ = this.checkCommentSubject.asObservable();
  resetView$ = this.resetViewSubject.asObservable();
  // Phương thức để phát tín hiệu khi bình luận bị xóa
  notifyCheckComment() {
    this.checkCommentSubject.next();
  }
  triggerRefresh() {
    this.refreshTrigger.next();
  }
  resetViews() {
    this.resetViewSubject.next();
  }
  private commentAddedSource = new Subject<void>();
  commentAdded$ = this.commentAddedSource.asObservable();

  // Phương thức để thông báo thêm bình luận
  notifyCommentAdded() {
    console.log('thông báo cập nhật danh sách cmt')
    this.commentAddedSource.next();
  }
}

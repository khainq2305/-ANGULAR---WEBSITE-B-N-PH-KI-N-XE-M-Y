import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "src/app/components/shared/confirm-dialog/confirm-dialog.component";
import { ConfirmRestoreDialogComponent } from 'src/app/components/shared/confirm-restore-dialog/confirm-restore-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: "app-delete",
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
MatNativeDateModule,

    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
  ],
  templateUrl: "./delete.component.html",
  styleUrl: "./delete.component.scss",
})
export class DeleteComponent {
  constructor(private dialog: MatDialog) {} 
  filterDate: Date | null = null;
  searchText: string = '';

  applyFilters() {
    this.filteredcategorys = this.deleteCategory.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(this.searchText.toLowerCase());
  
      
      if (!this.filterDate) return nameMatch;
  
      const deletedAt = new Date(item.deletedAt);
      const filterDate = new Date(this.filterDate);
  
    
      return nameMatch &&
             deletedAt.getFullYear() === filterDate.getFullYear() &&
             deletedAt.getMonth() === filterDate.getMonth() &&
             deletedAt.getDate() === filterDate.getDate();
    });
  }
  
  deleteCategory = [
    {
      id: 1,
      imagePath:
        "https://shop2banh.vn/images/thumbs/2024/11/nhot-fuchs-silkolene-max-10w40-4t-08l-products-2374.png",
      name: "Đĩa KingSpeed 260mm mẫu mới 4 lỗ",
      deletedAt: new Date("2025-03-10"),
    },
    {
      id: 2,
      imagePath:
        "https://shop2banh.vn/images/thumbs/2025/03/lop-goodride-h571-8090-14-9090-14-products-2420.jpg",
      name: "Phuộc RCB Flow Pro cho Vario, Click chính hãng",
      deletedAt: new Date("2025-03-12"),
    },
    {
      id: 3,
      imagePath:
        "https://shop2banh.vn/images/thumbs/2025/03/lop-goodride-h571-8090-14-9090-14-products-2420.jpg",
      name: "Nhớt Liqui Moly Molygen Scooter 5W30 0.8L",
      deletedAt: new Date("2025-03-14"),
    },
  ];

  confirmDelete(category: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        message: `Bạn có chắc chắn muốn xóa vĩnh viễn "${category.name}" không?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteForever(category);
      }
    });
  }
  filteredcategorys = [...this.deleteCategory]; 
 
  restoreCategory(category: any) {
    const dialogRef = this.dialog.open(ConfirmRestoreDialogComponent, {
      width: '400px',
      data: {
        message: `Bạn có chắc chắn muốn khôi phục danh mục "${category.name}" không?`
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        alert(`Đã khôi phục danh mục: ${category.name}`);
      }
    });
  }
 
  deleteForever(category: any) {
    if (
      confirm(
        `Bạn có chắc muốn xóa vĩnh viễn sản phẩm "${category.name}" không?`
      )
    ) {
      alert(`Đã xóa vĩnh viễn sản phẩm: ${category.name}`);
    }
  }
}

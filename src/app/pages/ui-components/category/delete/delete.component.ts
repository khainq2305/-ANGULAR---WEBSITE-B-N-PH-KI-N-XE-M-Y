import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { ConfirmDialogComponent } from "src/app/components/shared/confirm-dialog/confirm-dialog.component";
import { ConfirmRestoreDialogComponent } from 'src/app/components/shared/confirm-restore-dialog/confirm-restore-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { CategoryService } from "src/app/services/apis/category.service";
import { ICategory } from "src/app/interface/category.interface";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelect, MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { API_ENDPOINT } from "src/app/config/api-endpoint.config";
import { ToastrService } from "ngx-toastr";
import { DEFAULT_IMAGE_URL } from "src/app/config/api-endpoint.config";
@Component({
  selector: "app-delete",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule, 
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.scss"],
})
export class DeleteComponent implements OnInit {
  apiUrlImage = API_ENDPOINT.category.uploads;
  DEFAULT_IMAGE_URL = DEFAULT_IMAGE_URL;
  filterDate: Date | null = null;
  searchText: string = '';
  showNotFound: boolean = false;
  list: ICategory[] = [];
  deleteCategory = new MatTableDataSource<ICategory>([]);
  selectedCategories: ICategory[] = [];
  sortCriteria: string = 'nameAsc';

  constructor(private dialog: MatDialog, private categoryService: CategoryService, private toastr: ToastrService) {}

  ngOnInit() {
    this.getAllDeleteCategories();
  }

  getImageUrl(relativePath: string) {
    return `${this.apiUrlImage}/${relativePath}`;
  }
  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.DEFAULT_IMAGE_URL;
  }

  toggleSelectAll(event: any) {
    const isChecked = event.checked;
    this.deleteCategory.data.forEach(row => {
      row.selected = isChecked;
      // Cập nhật selectedCategories
      if (isChecked) {
        this.selectedCategories = [...this.deleteCategory.data]; // Thêm tất cả vào selectedCategories
      } else {
        this.selectedCategories = []; // Xóa tất cả khi không chọn
      }
    });
  }
  updateSelectedCategories(element: ICategory) {
    if (element.selected) {
      this.selectedCategories.push(element);
    } else {
      const index = this.selectedCategories.findIndex(item => item.id === element.id);
      if (index !== -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
  }
    

  isAllSelected() {
    return this.deleteCategory.data.length > 0 && this.deleteCategory.data.every(row => row.selected);
  }

  isIndeterminate() {
    return this.deleteCategory.data.some(row => row.selected) && !this.isAllSelected();
  }
  

  getAllDeleteCategories(): void {
    this.categoryService.getCategoryListDelete().subscribe({
      next: (res: any) => {
        this.list = res?.data ?? res;  
        this.deleteCategory.data = this.list;
        this.showNotFound = this.deleteCategory.filteredData.length === 0;
      },
      error: (err: any) => {
        console.error('Error fetching categories:', err);
      },
    });
  }

  applySort() {
    switch (this.sortCriteria) {
      case 'nameAsc': this.sortByNameAsc(); break;
      case 'nameDesc': this.sortByNameDesc(); break;
      case 'dateAsc': this.sortByDateAsc(); break;
      case 'dateDesc': this.sortByDateDesc(); break;
      default: break;
    }
  }

  sortByNameAsc() {
    this.deleteCategory.data = this.deleteCategory.data.sort((a, b) => a.name.localeCompare(b.name));
  }

  sortByNameDesc() {
    this.deleteCategory.data = this.deleteCategory.data.sort((a, b) => b.name.localeCompare(a.name));
  }

  sortByDateAsc() {
    this.deleteCategory.data = this.deleteCategory.data.sort((a, b) => {
      const dateA = a.deletedAt ? new Date(a.deletedAt).getTime() : 0;
      const dateB = b.deletedAt ? new Date(b.deletedAt).getTime() : 0;
      return dateA - dateB;
    });
  }
  
  
  sortByDateDesc() {
  this.deleteCategory.data = this.deleteCategory.data.sort((a, b) => {
    const dateA = a.deletedAt ? new Date(a.deletedAt).getTime() : 0;
    const dateB = b.deletedAt ? new Date(b.deletedAt).getTime() : 0;
    return dateB - dateA; // Sắp xếp theo thứ tự giảm dần
  });
}


  applyFilters() {
    this.deleteCategory.filterPredicate = (data: ICategory, filter: string) => {
      const nameMatch = data.name.toLowerCase().includes(filter);
      const deletedAtMatch = this.filterDate
            ? !!data.deletedAt && new Date(data.deletedAt).toLocaleDateString() === new Date(this.filterDate!).toLocaleDateString()
            : true;
          return nameMatch && deletedAtMatch;
    };
    this.deleteCategory.filter = this.searchText.trim().toLowerCase();
    if (!this.searchText) {
      this.deleteCategory.filter = Math.random().toString();
    }

    this.showNotFound = this.deleteCategory.filteredData.length === 0;
  }

  confirmDelete(category: ICategory) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: { message: `Bạn có chắc chắn muốn xóa vĩnh viễn "${category.name}" không?` },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteForever(category);
        this.getAllDeleteCategories();
      }
    });
  }

  restoreSelectedCategories() {
    if (this.selectedCategories.length === 0) return;

    const dialogRef = this.dialog.open(ConfirmRestoreDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn khôi phục ${this.selectedCategories.length} danh mục đã chọn không?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedCategories.forEach(category => {
          const restoredCategory = { ...category, deletedAt: null };
          this.categoryService.restoreCategory(restoredCategory).subscribe({
            next: () => {
              this.getAllDeleteCategories();
              this.toastr.success(`Danh mục "${category.name}" đã được khôi phục!`);
            },
            error: (err) => {
              this.toastr.error(`Có lỗi xảy ra khi khôi phục danh mục "${category.name}"`);
            }
          });
        });
      }
    });
  }

  restoreCategory(category: ICategory) {
    const dialogRef = this.dialog.open(ConfirmRestoreDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn khôi phục danh mục "${category.name}" không?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const restoredCategory = { ...category, deletedAt: null };
        this.categoryService.restoreCategory(restoredCategory).subscribe(() => {
          this.getAllDeleteCategories();
          this.toastr.success(`Danh mục "${category.name}" đã được khôi phục!`);
        });
      }
    });
  }

  deleteForever(category: ICategory) {
    this.categoryService.deleteCategory(category.id).subscribe({
      next: () => {
        this.getAllDeleteCategories();
        this.toastr.success(`Danh mục "${category.name}" đã bị xóa vĩnh viễn!`);
      },
      error: err => {
        this.toastr.error(`Có lỗi xảy ra khi xóa danh mục "${category.name}"`);
      }
    });
  }
}

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { BrandingComponent } from '../sidebar/branding.component'; // đường dẫn đúng đến component logo
import { CommonModule } from '@angular/common';      // để dùng *ngIf
import { FormsModule } from '@angular/forms';        // để dùng [(ngModel)]

@Component({
  selector: 'app-topstrip',
  standalone: true,
  imports: [
    TablerIconsModule,
    CommonModule,        // 👈 Thêm dòng này
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    MaterialModule,
    BrandingComponent // 👈 thêm dòng này vô để xài <app-branding>
  ],
  styleUrls: ['./topstrip.component.scss'], 
  templateUrl: './topstrip.component.html',
})
export class AppTopstripComponent {
  // constructor() {}
  showSearch = false;
  searchText = '';

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }
}

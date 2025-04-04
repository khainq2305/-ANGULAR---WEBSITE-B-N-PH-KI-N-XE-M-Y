import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ✅ THÊM VÀO ĐÂY
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
@Component({
  selector: 'app-product',
  imports: [ RouterModule,  CommonModule, DetailComponent ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

}

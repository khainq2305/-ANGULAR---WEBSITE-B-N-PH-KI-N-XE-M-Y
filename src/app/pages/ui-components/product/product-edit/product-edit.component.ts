import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { EditorComponent } from 'src/app/components/editor/editor.component';
import { CategoryService } from 'src/app/services/apis/category.service';
import { ProductService } from 'src/app/services/apis/product.service';
import { ICategory } from 'src/app/interface/category.interface';
import { ToastrService } from 'ngx-toastr';
import { API_BASE_URL } from 'src/app/config/api-endpoint.config';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCardModule,
    MatButtonModule,
    
    MatIconModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatSliderModule,
    EditorComponent
  ],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  productForm!: FormGroup;
  categories = signal<ICategory[]>([]);
  categoryList: ICategory[] = []; // ✅ thêm dòng này
  productImage: any = null;
  productId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.fetchCategories();
    this.fetchProduct();
  
    // Lắng nghe sự thay đổi của giá gốc và giảm giá để tính lại giá sau giảm
    this.productForm.get('price')?.valueChanges.subscribe(() => {
      this.updateFinalPrice();
    });
  
    this.productForm.get('discount')?.valueChanges.subscribe(() => {
      this.updateFinalPrice();
    });
  }
  
  updateFinalPrice() {
    const price = this.productForm.get('price')?.value || 0;
    const discount = this.productForm.get('discount')?.value || 0;
  
    let finalPrice = price - discount;
  
    // Nếu giá sau giảm < 0, trả lại giá gốc
    if (finalPrice < 0) {
      finalPrice = price;
    }
  
    this.productForm.patchValue({ finalPrice });
  }
  
  
  initForm() {
    this.productForm = this.fb.group({
      finalPrice: [0], // 👈 thêm dòng này
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[\p{L}0-9 ]+$/u)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
      discount: [0, [Validators.min(0)]], // Chỉ còn discount duy nhất
      quantity: [null, [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+$/)]],
      categories: [[], Validators.required],
      status: ['1', Validators.required],
      is_feature: ['0'],
      image: [null]
    }, { validators: this.discountValidator.bind(this) });
  }

  discountValidator(group: AbstractControl): ValidationErrors | null {
    const discount = group.get('discount')?.value;
    const price = group.get('price')?.value;
    const discountCtrl = group.get('discount');

    discountCtrl?.setErrors(null);

    if (discount !== null) {
      if (isNaN(discount) || typeof discount !== 'number') {
        discountCtrl?.setErrors({ invalid: true });
      } else if (discount < 0) {
        discountCtrl?.setErrors({ negative: true });
      } else if (price && discount > price) {
        discountCtrl?.setErrors({ greaterThanPrice: true });
      }
    }

    return null;
  }

  fetchCategories() {
    this.categoryService.getCategoryList().subscribe({
      next: (res: any) => {
        const all = res?.data ?? [];
        const active = all.filter((cat: any) => cat.status === 1);
        this.categories.set(active); // 👈 THÊM DÒNG NÀY
        this.categoryList = active;
        console.log('📦 Danh mục đang hoạt động:', active);
      },
      error: () => {
        this.toastr.error('Không lấy được danh mục');
      }
    });
  }
  
  
  fetchProduct() {
    this.productService.getProductById(this.productId).subscribe(res => {
      const product = res.data;
      
      this.productForm.patchValue({
        name: product.name,
        description: product.description,
        price: product.price,
        discount: Number(product.discount) || 0,

        quantity: product.quantity,
        categories: [product.idCategory], // giữ nguyên
        status: product.status === 1 ? '1' : '0',


        is_feature: String(product.is_feature),
        finalPrice: product.finalPrice || 0
      });
      console.log('📦 PATCHED STATUS:', this.productForm.get('status')?.value);

  
      // Tính giá sau giảm khi tải sản phẩm
      this.updateFinalPrice();
  
      if (product.image) {
        this.productImage = {
          url: `${API_BASE_URL}/uploads/${product.image}`,
          name: product.image,
          size: 0
        };
      
        // 👇 Patch vào form để không bị null khi submit
        this.productForm.patchValue({ image: this.productImage });
      }
      
    });
  }
  

  onUpdateForm() {
    if (this.productForm.invalid) {
      Object.values(this.productForm.controls).forEach(control => control.markAsTouched());
      
      // 🔥 Log lỗi từng field
      console.log('🧨 Form không hợp lệ!');
      Object.entries(this.productForm.controls).forEach(([key, control]) => {
        if (control.invalid) {
          console.log(`❌ ${key} invalid:`, control.errors);
        }
      });
    
      this.toastr.error('Form không hợp lệ!');
      return;
    }
    
  
    const value = this.productForm.value;
    const formData = new FormData();
    formData.append('name', value.name);
    formData.append('description', value.description);
    formData.append('price', value.price);
    formData.append('discount', value.discount.toString());

  
    // Tính lại giá sau giảm và gửi lên server
    const finalPrice = this.getDiscountedPrice();
    formData.append('finalPrice', finalPrice.toString());
  
    formData.append('quantity', value.quantity);
    formData.append('status', value.status);
    formData.append('is_feature', value.is_feature);
  
    // Upload ảnh nếu có
    if (this.productImage?.file) {
      formData.append('image', this.productImage.file);
    }
  
    // Gửi các danh mục đã chọn
    value.categories.forEach((id: number) => {
      formData.append('categories', id.toString());
    });
  
    this.productService.updateProduct(this.productId, formData).subscribe({
      next: () => {
        this.toastr.success('Cập nhật thành công!');
        this.router.navigate(['/admin/products']);
      },
      error: () => {
        this.toastr.error('Cập nhật thất bại!');
      }
    });
  }
  
  

  onImageUpload(event: any) {
    if (!event.target.files?.length) return;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.productImage = {
        name: file.name,
        size: file.size,
        url: reader.result as string,
        file
      };
      this.productForm.patchValue({ image: file });
      this.productForm.get('image')?.markAsTouched();
      this.productForm.get('image')?.updateValueAndValidity();
    };
  }
  onDiscountInput(event: any) {
    const value = event.target.value.replace(/,/g, '');
    const number = parseInt(value, 10);
    this.productForm.get('discount')?.setValue(isNaN(number) ? 0 : number);
  }
  
  getCategoryName(id: number): string {
    return this.categories().find(c => c.id === id)?.name || '';
  }
  getDiscountedPrice(): number {
    const price = this.productForm.get('price')?.value || 0;
    const discount = this.productForm.get('discount')?.value || 0;
  
    if (discount > price) {
      // Nếu giảm giá lớn hơn giá gốc, trả lại giá gốc
      return price;
    }
  
    return price - discount;
  }
  

  onDescriptionChange(value: string) {
    this.productForm.get('description')?.setValue(value);
    this.productForm.get('description')?.markAsTouched();
    this.productForm.get('description')?.updateValueAndValidity();
  }

  onRemoveCategory(id: number): void {
    const current = this.productForm.get('categories')!.value || [];
    this.productForm.get('categories')!.setValue(current.filter((catId: number) => catId !== id));
  }

  get f() {
    return this.productForm.controls;
  }
}

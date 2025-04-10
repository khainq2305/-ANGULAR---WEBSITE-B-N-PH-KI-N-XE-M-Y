// ✅ product-create.component.ts (Đã bỏ media, đổi thumbnail -> image)
// Cập nhật với các validator theo yêu cầu
import { Component, OnInit, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSliderModule,
    EditorComponent
  ],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  productForm!: FormGroup;
  categories = signal<ICategory[]>([]);
  productImage: any = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private toastr: ToastrService // dùng toast hiển thị kết quả
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.initForm();
  }

  // File validator để kiểm tra định dạng và kích thước ảnh
  fileValidator(control: AbstractControl): ValidationErrors | null {
    const file = control.value;
    if (file && file instanceof File) {
      // Cho phép các định dạng: jpg, jpeg, png, webp (không phân biệt chữ hoa/thường)
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.webp)$/i;
      if (!allowedExtensions.exec(file.name)) {
        return { invalidFileType: true };
      }
      // Kiểm tra kích thước: tối đa 5MB
      if (file.size > 5 * 1024 * 1024) {
        return { fileTooLarge: true };
      }
    }
    return null;
  }

  // Validator cho phần giảm giá (discount)
  discountValidator(group: AbstractControl): ValidationErrors | null {
    const type = group.get('discountType')?.value;
    const fixed = group.get('discountFixedPrice')?.value;
    const percent = group.get('discountPercentage')?.value;
    const price = group.get('price')?.value;
  
    if (type === 'percentage') {
      if (percent === null || percent < 1 || percent > 100) {
        return { invalidDiscountPercentage: true };
      }
    }
  
    if (type === 'fixed') {
      if (fixed === null || fixed === '') {
        return { invalidFixedPrice: 'Giá sau giảm là bắt buộc' };
      }
      if (fixed < 0) {
        return { invalidFixedPrice: 'Giá sau giảm không được âm' };
      }
      if (price && fixed > price) {
        return { fixedPriceGreaterThanPrice: true };
      }
    }
  
    return null;
  }
  

  // Khởi tạo form với các validators
  initForm() {
    this.productForm = this.fb.group({
      name: [
        '', 
        [
          Validators.required, 
          Validators.minLength(3),
          // Pattern chỉ cho phép chữ, số và khoảng trắng (bỏ qua các ký tự đặc biệt)
          Validators.pattern(/^[a-zA-Z0-9 ]+$/)
        ]
      ],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [
        null, 
        [
          Validators.required, 
          Validators.min(1),
          // Giá chỉ nhập số, với có thể có dấu chấm thập phân
          Validators.pattern(/^\d+(\.\d+)?$/)
        ]
      ],
      discountType: ['none'],
      discountPercentage: [
        null,
        [
          Validators.min(1),
          Validators.max(100),
        ]
      ],
            discountFixedPrice: [null],
      quantity: [
        null, 
        [
          Validators.required, 
          Validators.min(1),
          // Chỉ cho phép số nguyên
          Validators.pattern(/^[0-9]+$/)
        ]
      ],
      categories: [[], [Validators.required]],
      status: ['1', Validators.required],
      is_feature: ['0'],
      image: [null, [Validators.required, this.fileValidator.bind(this)]]
    }, { validators: this.discountValidator.bind(this) }); // gắn validator toàn cục cho group
  }

  fetchCategories() {
    this.categoryService.getCategoryList().subscribe({
      next: (res) => {
        console.log("✅ Danh mục nhận được:", res);
        this.categories.set(res.data);
      },
      error: (err) => {
        console.error("🔥 Lỗi lấy danh mục:", err);
        this.toastr.error('Lỗi tải danh mục! Vui lòng thử lại.');
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
        file,
      };
  
      // Patch và cập nhật trạng thái cho trường image
      this.productForm.patchValue({ image: file });
      this.productForm.get('image')?.markAsTouched();
      this.productForm.get('image')?.updateValueAndValidity();
  
      console.log("📸 Ảnh đã chọn:", file);
      console.log("✅ Is form valid now?", this.productForm.valid);
    };
  }
  

  getDiscountedPrice(): number {
    const price = this.productForm.get('price')?.value || 0;
    const type = this.productForm.get('discountType')?.value;
    const percent = this.productForm.get('discountPercentage')?.value;
    const fixed = this.productForm.get('discountFixedPrice')?.value;
  
    if (type === 'percentage') return price * (1 - percent / 100);
    if (type === 'fixed' && fixed !== null) return fixed;
    return price;
  }
  
  getCategoryName(id: number): string {
    return this.categories().find(c => c.id === id)?.name || '';
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
  
  onSubmitForm() {
    console.log("🟢 SUBMIT được gọi");
    if (this.productForm.invalid) {
      // Đánh dấu tất cả control là touched để hiển thị lỗi
      Object.keys(this.productForm.controls).forEach(key => {
        this.productForm.get(key)?.markAsTouched();
      });
      console.warn("❌ Form INVALID:", this.productForm.value);
      console.log("📛 Error controls:", this.f);
      this.toastr.error("Form không hợp lệ! Vui lòng kiểm tra lại các trường.");
      return;
    }
  
    console.log("✅ Form hợp lệ, đang gọi API...");
    const formValues = this.productForm.value;
    const formData = new FormData();
  
    formData.append('name', formValues.name);
    formData.append('description', formValues.description);
    formData.append('price', formValues.price);
    formData.append('discountType', formValues.discountType);
  
    const discountValue =
      formValues.discountType === 'percentage'
        ? formValues.discountPercentage
        : formValues.discountFixedPrice;
  
    formData.append('discountValue', discountValue);
    formData.append('finalPrice', this.getDiscountedPrice().toString());
    formData.append('quantity', formValues.quantity);
    formData.append('status', formValues.status);
    formData.append('is_feature', formValues.is_feature);
  
    if (this.productImage?.file) {
      formData.append('image', this.productImage.file);
    }
  
    formValues.categories.forEach((id: number) => {
      formData.append('categories', id.toString());
    });
  
    this.productService.createProduct(formData).subscribe({
      next: () => {
        this.toastr.success('Tạo sản phẩm thành công!');
        this.productForm.reset();
        this.productImage = null;
      },
      error: () => {
        this.toastr.error('Tạo sản phẩm thất bại!');
      }
    });
  }
  
  
  get f() {
    return this.productForm.controls;
  }
}

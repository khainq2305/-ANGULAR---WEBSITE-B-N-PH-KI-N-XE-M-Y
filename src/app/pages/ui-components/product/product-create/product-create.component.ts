import { Component, OnInit, Signal, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
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
    MatSlideToggleModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
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
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.initForm();
  
    // Theo dõi sự thay đổi của giá và giảm giá để tính toán lại giá sau giảm
    this.productForm.get('price')?.valueChanges.subscribe(() => {
      this.calculateDiscountedPrice();
    });
  
    this.productForm.get('discount')?.valueChanges.subscribe(() => {
      this.calculateDiscountedPrice();
    });
  }
  
// Phương thức tính giá sau giảm
calculateDiscountedPrice(): number {
  const price = this.productForm.get('price')?.value || 0;
  const discount = this.productForm.get('discount')?.value || 0;
  return price - discount;
}

  fileValidator(control: AbstractControl): ValidationErrors | null {
    const file = control.value;
    if (file && file instanceof File) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.webp)$/i;
      if (!allowedExtensions.exec(file.name)) {
        return { invalidFileType: true };
      }
      if (file.size > 5 * 1024 * 1024) {
        return { fileTooLarge: true };
      }
    }
    return null;
  }

  discountValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const discount = control.value;
      const price = this.productForm?.get('price')?.value;

      if (discount === null || discount === '') return null;

      // Không phải số hoặc < 0
      if (isNaN(discount) || discount < 0) {
        return { invalidDiscount: 'Giảm giá phải là số không âm' };
      }

      // Lớn hơn giá gốc
      if (price && discount > price) {
        return { invalidDiscount: 'Giảm giá không được lớn hơn giá gốc' };
      }

      return null;
    };
  }

  initForm() {
    this.productForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[\p{L}0-9 ]+$/u)
        ]
      ],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern(/^\d+(\.\d+)?$/)
        ]
      ],
      discount: [0, [this.discountValidator()]],
      quantity: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern(/^[0-9]+$/)
        ]
      ],
      categories: [[], [Validators.required]],
      status: ['1', Validators.required],
      is_feature: ['0'],
      image: [null, [Validators.required, this.fileValidator.bind(this)]]
    });

    // Tự động validate lại discount khi giá gốc thay đổi
    this.productForm.get('price')?.valueChanges.subscribe(() => {
      this.productForm.get('discount')?.updateValueAndValidity();
    });
  }

  fetchCategories() {
    this.categoryService.getCategoryList().subscribe({
      next: (res) => {
        this.categories.set(res.data);
      },
      error: (err) => {
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
        file
      };

      this.productForm.patchValue({ image: file });
      this.productForm.get('image')?.markAsTouched();
      this.productForm.get('image')?.updateValueAndValidity();
    };
  }

  getCategoryName(id: number): string {
    return this.categories().find((c) => c.id === id)?.name || '';
  }

  onDescriptionChange(value: string) {
    this.productForm.get('description')?.setValue(value);
    this.productForm.get('description')?.markAsTouched();
    this.productForm.get('description')?.updateValueAndValidity();
  }

  onRemoveCategory(id: number): void {
    const current = this.productForm.get('categories')!.value || [];
    this.productForm.get('categories')!.setValue(
      current.filter((catId: number) => catId !== id)
    );
  }

  onSubmitForm() {
    if (this.productForm.invalid) {
      Object.keys(this.productForm.controls).forEach((key) => {
        this.productForm.get(key)?.markAsTouched();
      });
      this.toastr.error('Form không hợp lệ! Vui lòng kiểm tra lại các trường.');
      return;
    }
  
    const formValues = this.productForm.value;
    const formData = new FormData();
  
    formData.append('name', formValues.name);
    formData.append('description', formValues.description);
    formData.append('price', formValues.price);
    formData.append('discount', formValues.discount);
    formData.append('quantity', formValues.quantity);
    formData.append('status', formValues.status);
    formData.append('is_feature', formValues.is_feature);
  
    // Tính giá sau giảm
    const finalPrice = this.calculateDiscountedPrice();
    formData.append('finalPrice', finalPrice.toString());
  
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

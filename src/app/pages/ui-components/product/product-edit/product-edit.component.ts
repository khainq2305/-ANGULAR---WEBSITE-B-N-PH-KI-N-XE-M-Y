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
  }

  initForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
      discountType: ['none'],
      discountPercentage: [null, [Validators.min(1), Validators.max(100)]],
      discountFixedPrice: [null],
      quantity: [null, [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+$/)]],
      categories: [[], Validators.required],
      status: ['1', Validators.required],
      is_feature: ['0'],
      image: [null]
    }, { validators: this.discountValidator.bind(this) });
  }

  discountValidator(group: AbstractControl): ValidationErrors | null {
    const type = group.get('discountType')?.value;
    const fixed = group.get('discountFixedPrice')?.value;
    const percent = group.get('discountPercentage')?.value;
    const price = group.get('price')?.value;

    if (type === 'percentage' && (percent === null || percent < 1 || percent > 100)) {
      return { invalidDiscountPercentage: true };
    }

    if (type === 'fixed') {
      if (fixed === null || fixed === '') return { invalidFixedPrice: 'Giá sau giảm là bắt buộc' };
      if (fixed < 0) return { invalidFixedPrice: 'Giá sau giảm không được âm' };
      if (price && fixed > price) return { fixedPriceGreaterThanPrice: true };
    }

    return null;
  }

  fetchCategories() {
    this.categoryService.getCategoryList().subscribe(res => {
      this.categories.set(res.data);
    });
  }

  fetchProduct() {
    this.productService.getProductById(this.productId).subscribe(res => {
      const product = res.data;
      this.productForm.patchValue({
        ...product,
        discountType: product.discount_type,
        discountFixedPrice: product.discount_type === 'fixed' ? product.discount_value : null,
        discountPercentage: product.discount_type === 'percentage' ? product.discount_value : null,
        categories: [product.idCategory],
      });
      
      if (product.image) {
        this.productImage = {
          url: `${API_BASE_URL}/uploads/${product.image}`,
          name: product.image,
          size: 0
        };
      }
    });
  }

  onUpdateForm() {
    if (this.productForm.invalid) {
      Object.values(this.productForm.controls).forEach(control => control.markAsTouched());
      this.toastr.error('Form không hợp lệ!');
      return;
    }

    const value = this.productForm.value;
    const formData = new FormData();
    formData.append('name', value.name);
    formData.append('description', value.description);
    formData.append('price', value.price);
    formData.append('discountType', value.discountType);
    const discountValue = value.discountType === 'percentage' ? value.discountPercentage : value.discountFixedPrice;
    formData.append('discountValue', discountValue);
    formData.append('finalPrice', this.getDiscountedPrice().toString());
    formData.append('quantity', value.quantity);
    formData.append('status', value.status);
    formData.append('is_feature', value.is_feature);

    if (this.productImage?.file) {
      formData.append('image', this.productImage.file);
    }

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

  getDiscountedPrice(): number {
    const price = this.productForm.get('price')?.value || 0;
    const type = this.productForm.get('discountType')?.value;
    const percent = this.productForm.get('discountPercentage')?.value;
    const fixed = this.productForm.get('discountFixedPrice')?.value;
    if (type === 'percentage') return price * (1 - percent / 100);
    if (type === 'fixed') return fixed;
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

  get f() {
    return this.productForm.controls;
  }
}

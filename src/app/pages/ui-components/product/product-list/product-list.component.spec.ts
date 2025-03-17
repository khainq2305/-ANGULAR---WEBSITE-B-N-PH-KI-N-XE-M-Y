import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
// Đây là file dùng để kiểm thử (testing) component với Jasmine & Karma
// Jasmine: Framework giúp viết và chạy unit test cho Angular.
// Karma: Công cụ chạy test trên nhiều trình duyệt để kiểm tra tính đúng đắn của component.
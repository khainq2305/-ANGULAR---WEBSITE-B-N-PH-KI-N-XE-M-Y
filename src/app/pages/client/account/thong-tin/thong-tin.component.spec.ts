import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinComponent } from './thong-tin.component';

describe('ThongTinComponent', () => {
  let component: ThongTinComponent;
  let fixture: ComponentFixture<ThongTinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThongTinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThongTinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

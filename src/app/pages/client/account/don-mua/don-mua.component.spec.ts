import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonMuaComponent } from './don-mua.component';

describe('DonMuaComponent', () => {
  let component: DonMuaComponent;
  let fixture: ComponentFixture<DonMuaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonMuaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonMuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

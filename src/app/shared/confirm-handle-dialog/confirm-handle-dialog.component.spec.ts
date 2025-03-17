import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmHandleDialogComponent } from './confirm-handle-dialog.component';

describe('ConfirmHandleDialogComponent', () => {
  let component: ConfirmHandleDialogComponent;
  let fixture: ComponentFixture<ConfirmHandleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmHandleDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmHandleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

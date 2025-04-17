import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccountLayoutComponent } from './client-account-layout.component';

describe('ClientAccountLayoutComponent', () => {
  let component: ClientAccountLayoutComponent;
  let fixture: ComponentFixture<ClientAccountLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientAccountLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientAccountLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelReceiptComponent } from './cancel-receipt.component';

describe('CancelReceiptComponent', () => {
  let component: CancelReceiptComponent;
  let fixture: ComponentFixture<CancelReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

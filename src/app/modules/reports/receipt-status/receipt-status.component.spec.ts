import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptStatusComponent } from './receipt-status.component';

describe('ReceiptStatusComponent', () => {
  let component: ReceiptStatusComponent;
  let fixture: ComponentFixture<ReceiptStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcourseFeeComponent } from './addcourse-fee.component';

describe('AddcourseFeeComponent', () => {
  let component: AddcourseFeeComponent;
  let fixture: ComponentFixture<AddcourseFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcourseFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcourseFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

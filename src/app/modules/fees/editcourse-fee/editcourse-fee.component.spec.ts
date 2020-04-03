import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcourseFeeComponent } from './editcourse-fee.component';

describe('EditcourseFeeComponent', () => {
  let component: EditcourseFeeComponent;
  let fixture: ComponentFixture<EditcourseFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcourseFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcourseFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

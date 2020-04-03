import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcoursePackageComponent } from './editcourse-package.component';

describe('EditcoursePackageComponent', () => {
  let component: EditcoursePackageComponent;
  let fixture: ComponentFixture<EditcoursePackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcoursePackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcoursePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

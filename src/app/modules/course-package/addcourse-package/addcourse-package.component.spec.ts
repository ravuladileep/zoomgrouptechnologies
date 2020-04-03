import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcoursePackageComponent } from './addcourse-package.component';

describe('AddcoursePackageComponent', () => {
  let component: AddcoursePackageComponent;
  let fixture: ComponentFixture<AddcoursePackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcoursePackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcoursePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentImageUploadComponent } from './student-image-upload.component';

describe('StudentImageUploadComponent', () => {
  let component: StudentImageUploadComponent;
  let fixture: ComponentFixture<StudentImageUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentImageUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

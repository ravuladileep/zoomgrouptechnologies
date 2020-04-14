import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNotEnrolledReportComponent } from './student-not-enrolled-report.component';

describe('StudentNotEnrolledReportComponent', () => {
  let component: StudentNotEnrolledReportComponent;
  let fixture: ComponentFixture<StudentNotEnrolledReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentNotEnrolledReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentNotEnrolledReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEnrolledReportComponent } from './student-enrolled-report.component';

describe('StudentEnrolledReportComponent', () => {
  let component: StudentEnrolledReportComponent;
  let fixture: ComponentFixture<StudentEnrolledReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentEnrolledReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEnrolledReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

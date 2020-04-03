import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSpecificReportComponent } from './course-specific-report.component';

describe('CourseSpecificReportComponent', () => {
  let component: CourseSpecificReportComponent;
  let fixture: ComponentFixture<CourseSpecificReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSpecificReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSpecificReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

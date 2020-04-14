import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorReportComponent } from './counsellor-report.component';

describe('CounsellorReportComponent', () => {
  let component: CounsellorReportComponent;
  let fixture: ComponentFixture<CounsellorReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounsellorReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

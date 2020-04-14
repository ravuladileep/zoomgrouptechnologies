import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalAdmissionReportComponent } from './total-admission-report.component';

describe('TotalAdmissionReportComponent', () => {
  let component: TotalAdmissionReportComponent;
  let fixture: ComponentFixture<TotalAdmissionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalAdmissionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalAdmissionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

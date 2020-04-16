import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToasterService } from 'src/app/shared/dialogs/alerts/toaster.service';
import { CommonConstants } from 'src/app/config/constants';

@Component({
  selector: 'app-total-admission-report',
  templateUrl: './total-admission-report.component.html',
  styleUrls: ['./total-admission-report.component.css']
})
export class TotalAdmissionReportComponent implements OnInit {
  public admissionReport: FormGroup;
  public coursesDataarr = [...CommonConstants.coursesDataarr];
  public branchesDataarr = [...CommonConstants.branchesDataarr];
  public coursePackagearr = [...CommonConstants.coursePackagearr];



  constructor(private fb: FormBuilder,  private toaster: ToasterService) {
    this.admissionReportForm();
  }

  ngOnInit(): void {
  }

  public admissionReportForm() {
    this.admissionReport = this.fb.group({
      report: ['mixCombination'],
      selectDay: [''],
      startDate: [''],
      endDate: [''],
      branch: [null],
      course: [null],
      coursePackage: [null]

    });
  }

  get admissionData() {
    return this.admissionReport.controls;
  }

  public resetForm(): void{
    this.admissionReport.reset();
  }

  public submit(): void {
  }

}

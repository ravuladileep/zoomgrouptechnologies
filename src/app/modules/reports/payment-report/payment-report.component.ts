import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonConstants } from '../../../config/constants';

@Component({
  selector: 'app-payment-report',
  templateUrl: './payment-report.component.html',
  styleUrls: ['./payment-report.component.css']
})
export class PaymentReportComponent implements OnInit {
  public paymentReport: FormGroup;
  public branchesDataarr = [...CommonConstants.branchesDataarr];
  public coursesDataarr = [...CommonConstants.coursesDataarr];
  public coursePackagearr = [...CommonConstants.coursePackagearr];
  public paymentModearr = ['Cash', 'Card', 'Cash/Card'];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.paymentReportForm();
  }

  public paymentReportForm(): void{
    this.paymentReport = this.fb.group({
      startDate: [],
      endDate: [],
      branch: [null],
      course: [null],
      coursePackage: [null],
      paymentMode: [null],
      paymentStatus: [null]
    });
  }

  get paymentData() {
   return  this.paymentReport.controls;
  }

  public submit(): void{
    console.log(this.paymentReport.value);
  }

}


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-payment-report',
  templateUrl: './payment-report.component.html',
  styleUrls: ['./payment-report.component.css']
})
export class PaymentReportComponent implements OnInit {
  public paymentReport: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.paymentReportForm();
  }

  public paymentReportForm(): void{
    this.paymentReport = this.fb.group({
      startDate: [],
      endDate: []
    });
  }

  get paymentData() {
   return  this.paymentReport.controls;
  }

  public submit(): void{
    console.log(this.paymentReport.value);
  }

}


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-accountant-report',
  templateUrl: './accountant-report.component.html',
  styleUrls: ['./accountant-report.component.css']
})
export class AccountantReportComponent implements OnInit {
  public accountantForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.accountantReportForm();
  }

  public accountantReportForm(): void{
    this.accountantForm = this.fb.group({
      startDate: [],
      endDate: []
    });
  }

  get accountantData() {
   return  this.accountantForm.controls;
  }

  public submit(): void{
    console.log(this.accountantForm.value);
  }

}

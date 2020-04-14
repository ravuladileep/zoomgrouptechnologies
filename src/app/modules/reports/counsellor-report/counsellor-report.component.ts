import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-counsellor-report',
  templateUrl: './counsellor-report.component.html',
  styleUrls: ['./counsellor-report.component.css']
})
export class CounsellorReportComponent implements OnInit {
  public reportForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.counsellorReportForm();
  }

  public counsellorReportForm(): void{
    this.reportForm = this.fb.group({
      startDate: [],
      endDate: []
    });
  }

  get reportData() {
   return  this.reportForm.controls;
  }

  public submit(): void{
    console.log(this.reportForm.value);
  }

}

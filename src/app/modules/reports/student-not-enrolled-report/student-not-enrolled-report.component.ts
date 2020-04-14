import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-student-not-enrolled-report',
  templateUrl: './student-not-enrolled-report.component.html',
  styleUrls: ['./student-not-enrolled-report.component.css']
})
export class StudentNotEnrolledReportComponent implements OnInit {
  public studentNotenroll: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.studentNotEnrollForm();
  }

  public studentNotEnrollForm(): void{
    this.studentNotenroll = this.fb.group({
      startDate: [],
      endDate: []
    });
  }

  get notEnrollData() {
   return  this.studentNotenroll.controls;
  }

  public submit(): void{
    console.log(this.studentNotenroll.value);
  }

}

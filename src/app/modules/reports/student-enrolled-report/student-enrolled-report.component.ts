import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonConstants } from '../../../config/constants';

@Component({
  selector: 'app-student-enrolled-report',
  templateUrl: './student-enrolled-report.component.html',
  styleUrls: ['./student-enrolled-report.component.css']
})
export class StudentEnrolledReportComponent implements OnInit {
  public studentEnrolled: FormGroup;
  public branchesDataarr = [...CommonConstants.branchesDataarr];
  public coursesDataarr = [...CommonConstants.coursesDataarr];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.studentEnrolledForm();
  }

  public studentEnrolledForm(): void{
    this.studentEnrolled = this.fb.group({
      startDate: [],
      endDate: [],
      course: [null],
      branch: [null],
      payment: [],
    });
  }

  get enrolledData() {
   return  this.studentEnrolled.controls;
  }

  public submit(): void{
    console.log(this.studentEnrolled.value);
  }

}


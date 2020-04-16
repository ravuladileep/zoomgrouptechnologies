import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonConstants } from '../../../config/constants';

@Component({
  selector: 'app-attendance-sheet',
  templateUrl: './attendance-sheet.component.html',
  styleUrls: ['./attendance-sheet.component.css']
})
export class AttendanceSheetComponent implements OnInit {
  public attendanceSheet: FormGroup;
  public branchesDataarr = [...CommonConstants.branchesDataarr];
  public coursesDataarr = [...CommonConstants.coursesDataarr];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.attendanceSheetForm();
  }

  public attendanceSheetForm(): void{
    this.attendanceSheet = this.fb.group({
      startDate: [],
      endDate: [],
      branch: [null],
      course: [null],
      paymentOptions: []
    });
  }

  get attendanceData() {
   return  this.attendanceSheet.controls;
  }

  public submit(): void{
    console.log(this.attendanceSheet.value);
  }

}


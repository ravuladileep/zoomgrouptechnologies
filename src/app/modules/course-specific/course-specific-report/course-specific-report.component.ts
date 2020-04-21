import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonConstants } from '../../../config/constants';

@Component({
  selector: 'app-course-specific-report',
  templateUrl: './course-specific-report.component.html',
  styleUrls: ['./course-specific-report.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CourseSpecificReportComponent implements OnInit {
  public courseSpecificData: FormGroup;
  public coursesDataarr = [...CommonConstants.coursesDataarr];
  public branchesDataarr = [...CommonConstants.branchesDataarr];

  constructor(private fb: FormBuilder) {
    this.courseSpecificForm();
  }
  ngOnInit(): void {}

  courseSpecificForm() {
    this.courseSpecificData = this.fb.group({
      courseName: [null, [Validators.required]],
      scheduleDate: ['', Validators.required],
      branchName: [null, [Validators.required]]
    });
  }

  get specificData() {
    return this.courseSpecificData.controls;
  }


  // changeBranchName(e) {
  //   this.branchName.setValue(e.target.value, {
  //     onlySelf: true
  //   });
  // }

  // changeCourseName(e) {
  //   this.courseName.setValue(e.target.value, {
  //     onlySelf: true
  //   });
  // }
  Submit() {
    console.log('form data', this.courseSpecificData.value);
  }
}

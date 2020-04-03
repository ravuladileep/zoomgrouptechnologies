import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-specific-report',
  templateUrl: './course-specific-report.component.html',
  styleUrls: ['./course-specific-report.component.css']
})
export class CourseSpecificReportComponent implements OnInit {

  courseSpecificData: FormGroup;
  Course: any = ['CCNA', 'CCNP', 'Angular'];
  Branch: any = ['Ameerpet', 'Banjara Hills', 'Gachibowli'];

  constructor(private fb: FormBuilder) {
    this.courseSpecificForm();
   }

  courseSpecificForm() {
   this.courseSpecificData = this.fb.group({
      courseName: ['', [Validators.required]],
      branchName: ['', [Validators.required]]
    });
  }


  get courseName() {
    return this.courseSpecificData.get('courseName');
  }
  get branchName() {
    return this.courseSpecificData.get('branchName');
  }

  changeBranchName(e) {
    this.branchName.setValue(e.target.value, {
      onlySelf: true
    });
  }

  changeCourseName(e) {
    this.courseName.setValue(e.target.value, {
      onlySelf: true
    });
  }
  Submit() {
    console.log('form data', this.courseSpecificData.value);
  }
  ngOnInit(): void {
  }


}

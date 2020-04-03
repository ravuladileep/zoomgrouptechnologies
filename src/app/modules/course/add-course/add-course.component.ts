import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn} from '@angular/forms';
import { CourseService } from 'src/app/services/course/course.service';
import { of } from 'rxjs';
import { ToasterService } from 'src/app/shared/dialogs/alerts/toaster.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  public addCourseSpecificForm: FormGroup;
  public taxValue: number;
  public totalCourseFee: number;
  public branchesDataarr = [
    { id: 'Ameerpet', name: 'Ameerpet' },
    { id: 'Banjara Hills', name: 'Banjara Hills' },
    { id: 'Dilsukh nagar', name: 'Dilsukh nagar' },
    { id: 'Secunderabad', name: 'Secunderabad' },
    { id: 'Test linux', name: 'Test linux' },
    { id: 'Surat', name: 'Surat' },
    { id: 'Vijayawada', name: 'Vijayawada' }
  ];
  public branchesData = [];

  constructor(private fb: FormBuilder, private courseService: CourseService, private toaster: ToasterService) {
    this.addCourseForm();
  }

  ngOnInit(): void {}

  public addCourseForm(): void {
    this.addCourseSpecificForm = this.fb.group({
      coursename: ['', [Validators.required]],
      branch: this.fb.array([], minSelectedCheckboxes(1)),
      fees: ['', [Validators.required]],
      servicetax: [''],
      totalfee: [''],
      seats: ['', [Validators.required]]
    });

    // async orders
    of(this.getBranches()).subscribe(res => {
      this.branchesData = res;
      this.addCheckboxes();
    });

    // synchronous orders
    // this.orders = this.getBranches();
    // this.addCheckboxes();
  }

  private addCheckboxes() {
    this.branchesData.forEach((o, i) => {
      const control = new FormControl(); // i===0 if first item set to true, else false
      (this.addCourseSpecificForm.controls.branch as FormArray).push(control);
    });
  }

  getBranches() {
    return [...this.branchesDataarr];
  }

  get courseData() {
    return this.addCourseSpecificForm.controls;
  }

  /**
   * @ function : calculteTax
   * @ Purpose  : caluculating the tax value
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public calculateTax(): void {
    this.taxValue = (this.addCourseSpecificForm.get('fees').value * 18) / 100;
    this.totalCourseFee = +this.courseData.fees.value + +this.taxValue;
    this.courseData.servicetax.patchValue(this.taxValue);
    this.courseData.totalfee.patchValue(this.totalCourseFee);
  }

  /**
   * @ function : Submit
   * @ Purpose  : submitting the form data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public submit(): void {
    this.addCourseSpecificForm.value.branch = this.addCourseSpecificForm.value.branch
      .map((v, i) => (v ? this.branchesData[i].id : null));
    this.courseService.addCourse(this.addCourseSpecificForm.value).subscribe((res) => {
      this.toaster.recordAdded();
    });
    this.addCourseSpecificForm.reset();
  }

}

  /**
   * @ function : minSelectedCheckboxes
   * @ Purpose  : validatorFn for minselected checkboxes
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */


function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => (next ? prev + next : prev), 0);

    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}


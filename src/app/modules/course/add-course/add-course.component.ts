import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn} from '@angular/forms';
import { of } from 'rxjs';
import { CourseService } from '../../../services/course/course.service';
import { ToasterService } from '../../../shared/dialogs/alerts/toaster.service';
import { CommonConstants } from '../../../config/constants';
import { CustomValidators } from '../../../shared/directives/checkboxmin.validator';
import { FormCanDeactivate } from '../../../core/guards/candeactivate/form-can-deactivate';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AddCourseComponent extends FormCanDeactivate implements OnInit {
  public addCourseSpecificForm: FormGroup;
  public taxValue: number;
  public totalCourseFee: number;
  public branchesDataarr = [...CommonConstants.branchesDataarr];
  public branchesData = [];

  constructor(private fb: FormBuilder, private courseService: CourseService, private toaster: ToasterService) {
    super();
    this.addCourseForm();
  }

  ngOnInit(): void {
    this.formCanDeactivate = this.addCourseSpecificForm;
  }

  public addCourseForm(): void {
    this.addCourseSpecificForm = this.fb.group({
      coursename: ['', [Validators.required]],
      branch: this.fb.array([], CustomValidators.multipleCheckboxRequireOne),
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

  /**
   * @ function : addCheckboxes & getBranches
   * @ Purpose  : adding checkboxes dynamically
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

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
   * @ function : checkboxMapping
   * @ Purpose  : converting the selected checkboxes from true/false to actual value
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */


  public checkboxMapping(): void {
    this.addCourseSpecificForm.value.branch = this.addCourseSpecificForm.value.branch
    .map((v, i) => (v ? this.branchesData[i] : null))
    .filter(v => v != null);
  }

  /**
   * @ function : submit
   * @ Purpose  : submitting the form data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public submit(): void {
    this.checkboxMapping();
    this.courseService.addCourse(this.addCourseSpecificForm.value).subscribe((res) => {
      this.toaster.recordAdded();
    });
    this.addCourseSpecificForm.reset();
  }

}



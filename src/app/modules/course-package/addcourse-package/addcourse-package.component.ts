import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { CoursePackageService } from '../../../services/course-package/course-package.service';
import { ToasterService } from '../../../shared/dialogs/alerts/toaster.service';
import { CommonConstants } from '../../../config/constants';


@Component({
  selector: 'app-addcourse-package',
  templateUrl: './addcourse-package.component.html',
  styleUrls: ['./addcourse-package.component.css']
})
export class AddcoursePackageComponent implements OnInit {
  public coursesDataarr = [...CommonConstants.coursesDataarr];
  public addCoursePackageSpecificForm: FormGroup;
  public taxValue: number;
  public totalPackage: number;
  public branchesDataarr = [...CommonConstants.branchesDataarr];
  public branchesData = [];
  public coursesData = [];
  constructor(private fb: FormBuilder, private coursePackage: CoursePackageService, private toaster: ToasterService) {
    this.addPackageForm();
  }

  ngOnInit(): void {}

  public addPackageForm(): void {
    this.addCoursePackageSpecificForm = this.fb.group({
      packageName: ['', [Validators.required]],
      courseName: this.fb.array([], minSelectedCheckboxes(1)),
      branch: this.fb.array([], minSelectedCheckboxes(1)),
      packageAmount: ['', [Validators.required]],
      servicetax: [''],
      totalPackage: ['']
    });

    // async orders
    of(this.getBranches()).subscribe(res => {
      this.branchesData = res;
      this.addCheckboxesbranch();
    });

    of(this.getCourses()).subscribe(res => {
      this.coursesData = res;
      this.addCheckboxesCourse();
    });
    // synchronous orders
    // this.orders = this.getBranches();
    // this.addCheckboxesbranch();

  }

  private addCheckboxesbranch() {
    this.branchesData.forEach((o, i) => {
      const control = new FormControl(); // i===0 if first item set to true, else false
      (this.addCoursePackageSpecificForm.controls.branch as FormArray).push(control);
    });
  }

  getBranches() {
    return [...this.branchesDataarr];
  }

  private addCheckboxesCourse() {
    this.coursesData.forEach((o, i) => {
      const control = new FormControl(); // i===0 if first item set to true, else false
      (this.addCoursePackageSpecificForm.controls.courseName as FormArray).push(control);
    });
  }


  getCourses() {
    return [...this.coursesDataarr];
  }

  get packageData() {
    return this.addCoursePackageSpecificForm.controls;
  }

  /**
   * @ function : calculteTax
   * @ Purpose  : caluculating the tax value
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public calculateTax(): void {
    this.taxValue = (this.addCoursePackageSpecificForm.get('packageAmount').value * 18) / 100;
    this.totalPackage = +this.packageData.packageAmount.value + +this.taxValue;
    this.packageData.servicetax.patchValue(this.taxValue);
    this.packageData.totalPackage.patchValue(this.totalPackage);
  }

  /**
   * @ function : checkboxMapping
   * @ Purpose  : converting the checkbox values from true/false to value
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */
  public checkboxMapping() {
    this.addCoursePackageSpecificForm.value.branch = this.addCoursePackageSpecificForm.value.branch
    .map((v, i) => (v ? this.branchesData[i] : null))
    .filter(v => v != null);
    this.addCoursePackageSpecificForm.value.courseName = this.addCoursePackageSpecificForm.value.courseName
    .map((v, i) => (v ? this.coursesData[i] : null))
    .filter(v => v != null);
  }

  /**
   * @ function : Submit
   * @ Purpose  : submitting the form data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public submit(): void {
    this.checkboxMapping();
    this.coursePackage.addCoursePackage(this.addCoursePackageSpecificForm.value).subscribe((res) => {
      this.toaster.recordAdded();
    });
    this.addCoursePackageSpecificForm.reset();
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

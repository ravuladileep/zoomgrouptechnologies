import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl} from '@angular/forms';
import { of } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { CoursePackageService } from '../../../services/course-package/course-package.service';
import { ToasterService } from '../../../shared/dialogs/alerts/toaster.service';
import { CommonConstants } from '../../../config/constants';
import { CustomValidators } from '../../../shared/directives/checkboxmin.validator';
import { FormCanDeactivate } from '../../../core/guards/candeactivate/form-can-deactivate';

@UntilDestroy()
@Component({
  selector: 'app-addcourse-package',
  templateUrl: './addcourse-package.component.html',
  styleUrls: ['./addcourse-package.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AddcoursePackageComponent extends FormCanDeactivate
  implements OnInit {
  public coursesDataarr = [...CommonConstants.coursesDataarr];
  public addCoursePackageSpecificForm: FormGroup;
  public taxValue: number;
  public totalPackage: number;
  public branchesDataarr = [...CommonConstants.branchesDataarr];
  public branchesData = [];
  public coursesData = [];
  constructor(
    private fb: FormBuilder,
    private packageService: CoursePackageService,
    private toaster: ToasterService
  ) {
    super();
    this.addPackageForm();
  }

  ngOnInit(): void {
    this.formCanDeactivate = this.addCoursePackageSpecificForm;
  }

  public addPackageForm(): void {
    this.addCoursePackageSpecificForm = this.fb.group({
      packageName: ['', [Validators.required]],
      courseName: this.fb.array(
        [],
        CustomValidators.multipleCheckboxRequireOne
      ),
      branch: this.fb.array([], CustomValidators.multipleCheckboxRequireOne),
      packageAmount: ['', [Validators.required]],
      servicetax: [''],
      totalPackage: [''],
    });

    // async orders
    of(this.getBranches())
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.branchesData = res;
        this.addCheckboxesbranch();
      });

    of(this.getCourses())
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.coursesData = res;
        this.addCheckboxesCourse();
      });
    // synchronous orders
    // this.orders = this.getBranches();
    // this.addCheckboxesbranch();
  }

  /**
   * @ function : addCheckboxesbranch &getBranches
   * @ Purpose  : adding checkboxes dynamically to the formarray
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  private addCheckboxesbranch() {
    this.branchesData.forEach((o, i) => {
      const control = new FormControl(); // i===0 if first item set to true, else false
      (this.addCoursePackageSpecificForm.controls.branch as FormArray).push(
        control
      );
    });
  }

  getBranches() {
    return [...this.branchesDataarr];
  }

  private addCheckboxesCourse() {
    this.coursesData.forEach((o, i) => {
      const control = new FormControl(); // i===0 if first item set to true, else false
      (this.addCoursePackageSpecificForm.controls.courseName as FormArray).push(
        control
      );
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
      .filter((v) => v != null);
    this.addCoursePackageSpecificForm.value.courseName = this.addCoursePackageSpecificForm.value.courseName
      .map((v, i) => (v ? this.coursesData[i] : null))
      .filter((v) => v != null);
  }

  /**
   * @ function : Submit
   * @ Purpose  : submitting the form data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public submit(): void {
    this.checkboxMapping();
    this.packageService
      .addCoursePackage(this.addCoursePackageSpecificForm.value)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.toaster.recordAdded();
      });
    this.addCoursePackageSpecificForm.reset();
  }
}

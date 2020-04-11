import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidatorFn, FormArray, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { CoursePackageService } from '../../../services/course-package/course-package.service';
import { ToasterService } from '../../../shared/dialogs/alerts/toaster.service';
import { CommonConstants } from '../../../config/constants';
import { CustomValidators } from '../../../shared/directives/checkboxmin.validator';
declare var $: any;
@Component({
  selector: 'app-editcourse-package',
  templateUrl: './editcourse-package.component.html',
  styleUrls: ['./editcourse-package.component.css']
})
export class EditcoursePackageComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;
  public coursesDataarr = [...CommonConstants.coursesDataarr];
  public coursePackageDatalist = [];
  public updateCoursePackageSpecificForm: FormGroup;
  public updateid: any;
  public taxValue: number;
  public totalPackage: number;
  public branchesDataarr = [...CommonConstants.branchesDataarr];
  public branchesData = [];
  public coursesData = [];
  public term: any;
  public p = 1;

  //  orderBy data
  public records = this.coursePackageDatalist;
  public isDesc = false;
  public column;
  public direction: number;

  constructor(
    private coursePackage: CoursePackageService,
    private fb: FormBuilder,
    private toaster: ToasterService
  ) {
    this.coursePackageForm();
  }

  ngOnInit(): void {
    this.loadCoursePackageData();
  }

  public coursePackageForm(): void {
    this.updateCoursePackageSpecificForm = this.fb.group({
      packageName: ['', [Validators.required]],
      courseName: this.fb.array([], CustomValidators.multipleCheckboxRequireOne),
      branch: this.fb.array([], CustomValidators.multipleCheckboxRequireOne),
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
      // this.addCheckboxes();

  }

  private addCheckboxesbranch() {
    this.branchesData.forEach((o, i) => {
      const control = new FormControl(); // i===0 if first item set to true, else false
      (this.updateCoursePackageSpecificForm.controls.branch as FormArray).push(control);
    });
  }

  private addCheckboxesCourse() {
    this.coursesData.forEach((o, i) => {
      const control = new FormControl(); // i===0 if first item set to true, else false
      (this.updateCoursePackageSpecificForm.controls.courseName as FormArray).push(control);
    });
  }

  getBranches() {
    return [...this.branchesDataarr];
  }

  getCourses() {
    return [...this.coursesDataarr];
  }

  get packageData() {
    return this.updateCoursePackageSpecificForm.controls;
  }

  /**
   * @ function : calculteTax
   * @ Purpose  : caluculating the tax value
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public calculateTax(): void {
    this.taxValue = (this.updateCoursePackageSpecificForm.get('packageAmount').value * 18) / 100;
    this.totalPackage = +this.packageData.packageAmount.value + +this.taxValue;
    this.packageData.servicetax.patchValue(this.taxValue);
    this.packageData.totalPackage.patchValue(this.totalPackage);
  }

  /**
   * @ function : loadCoursePackageData
   * @ Purpose  : fetching the branchdata
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public loadCoursePackageData(): void {
    this.coursePackage.getCourseDataPackage().subscribe(res => {
      this.coursePackageDatalist = res;
    });
  }


  /**
   * @ function : order
   * @ Purpose  : table data asc||desc order
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public order(property): void {
    this.isDesc = !this.isDesc; // change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  /**
   * @ function : editCoursedata
   * @ Purpose  : getCourseDataById & assigning to form fields
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public editCoursePackagedata(data): void {
    this.coursePackage.getCoursePackageById(data.id).subscribe(res => {
      this.updateid = data.id;
      this.updateCoursePackageSpecificForm.patchValue(res);
      const mybr = this.updateCoursePackageSpecificForm.controls.branch as FormArray;
      const mycr = this.updateCoursePackageSpecificForm.controls.courseName as FormArray;
      // patching checkboxes according to their respective index numbers
      // for branches
      for (let i = 0; i < mybr.length; i++) {
        mybr.at(i).patchValue(null);
      }
      res.branch.forEach(x => {
        mybr.at(this.branchesDataarr.indexOf(x)).patchValue(x);
      });
      // for courses
      for (let i = 0; i < mycr.length; i++) {
        mycr.at(i).patchValue(null);
      }
      res.courseName.forEach(x => {
        mycr.at(this.coursesDataarr.indexOf(x)).patchValue(x);
      });
      //  end patching
    });
  }

  /**
   * @ function : checkboxMapping
   * @ Purpose  : converting the checkbox values from true/false to value
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public checkboxMapping() {
    this.updateCoursePackageSpecificForm.value.branch = this.updateCoursePackageSpecificForm.value.branch
    .map((v, i) => (v ? this.branchesData[i] : null))
    .filter(v => v != null);
    this.updateCoursePackageSpecificForm.value.courseName = this.updateCoursePackageSpecificForm.value.courseName
    .map((v, i) => (v ? this.coursesData[i] : null))
    .filter(v => v != null);
  }


  /**
   * @ function : updateCourse
   * @ Purpose  : updating the Course data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public updateCoursePackage(): void {
    this.checkboxMapping();
    this.coursePackage
      .updateCoursePackageData(this.updateid, this.updateCoursePackageSpecificForm.value)
      .subscribe(res => {
        this.loadCoursePackageData();
        this.toaster.recordUpdated();
      });
    $(this.modal.nativeElement).click();
  }

  /**
   * @ function : deleteCoursedata
   * @ Purpose  : deleting the course data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public deleteCoursePackagedata(data): void {
    if (confirm('This course deleted permanently')) {
      this.coursePackage.deleteCoursePackage(data.id).subscribe(res => {
      this.loadCoursePackageData();
      this.toaster.recordDeleted();
      });
    }
  }

}



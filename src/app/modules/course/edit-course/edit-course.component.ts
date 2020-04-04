import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CourseService } from 'src/app/services/course/course.service';
import { FormBuilder, Validators, FormGroup, ValidatorFn, FormArray, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { ToasterService } from 'src/app/shared/dialogs/alerts/toaster.service';
declare var $: any;
@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;
  public courseDatalist = [];
  public updateCourseSpecificData: FormGroup;
  public updateid: any;
  public sortedData: any;
  public taxValue: number;
  public totalCourseFee: number;
  branchesDataarr = [
    { id: 'Ameerpet', name: 'Ameerpet' },
    { id: 'Banjara Hills', name: 'Banjara Hills' },
    { id: 'Dilsukh nagar', name: 'Dilsukh nagar' },
    { id: 'Secunderabad', name: 'Secunderabad' },
    { id: 'Test linux', name: 'Test linux' },
    { id: 'Surat', name: 'Surat' },
    { id: 'Vijayawada', name: 'Vijayawada' }
  ];
  public branchesData = [];
  public term: any;

  //  orderBy data
  public records = this.sortedData;
  public isDesc = false;
  public column;
  public direction: number;

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    private toaster: ToasterService
  ) {
    this.courseForm();
  }

  ngOnInit(): void {
    this.loadCourseData();
  }

  public courseForm(): void {
    this.updateCourseSpecificData = this.fb.group({
      coursename: ['', [Validators.required]],
      branch: this.fb.array([]),
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
      (this.updateCourseSpecificData.controls.branch as FormArray).push(control);
    });
  }

  getBranches() {
    return [...this.branchesDataarr];
  }

  get courseData() {
    return this.updateCourseSpecificData.controls;
  }

  /**
   * @ function : calculteTax
   * @ Purpose  : caluculating the tax value
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public calculateTax(): void {
    this.taxValue = (this.updateCourseSpecificData.get('fees').value * 18) / 100;
    this.totalCourseFee = +this.courseData.fees.value + +this.taxValue;
    this.courseData.servicetax.patchValue(this.taxValue);
    this.courseData.totalfee.patchValue(this.totalCourseFee);
  }

  /**
   * @ function : loadCourseData
   * @ Purpose  : fetching the branchdata
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public loadCourseData(): void {
    this.courseService.getCourseData().subscribe(res => {
      this.courseDatalist = res;
      this.sortedData = [...this.courseDatalist];
    });
  }

  /**
   * @ function : sortData
   * @ Purpose  : sorting the branchdata
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public sortData(event) {
    this.sortedData = [...this.courseDatalist];
    if (event.target.value === 'all') {
      this.sortedData = [...this.courseDatalist];
    }
    if (this.sortedData.length >= event.target.value) {
      return (this.sortedData.length = event.target.value);
    }
    return (this.sortedData = [...this.courseDatalist]);
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

  public editCoursedata(data): void {
    this.courseService.getCourseById(data.id).subscribe(res => {
      this.updateid = data.id;
      this.updateCourseSpecificData.patchValue(res);
    });
  }



  /**
   * @ function : updateCourse
   * @ Purpose  : updating the Course data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public updateCourse(): void {
    this.updateCourseSpecificData.value.branch = this.updateCourseSpecificData.value.branch
    .map((v, i) => (v ? this.branchesData[i].id : null));
    this.courseService
      .updateCourseData(this.updateid, this.updateCourseSpecificData.value)
      .subscribe(res => {
        this.loadCourseData();
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

  public deleteCoursedata(data): void {
    if (confirm('This course deleted permanently')) {
      this.courseService.deleteCourse(data.id).subscribe(res => {
      this.loadCourseData();
      this.toaster.recordDeleted();
      });
    }
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
          .reduce((prev, next) => next ? prev + next : prev, 0);

        return totalSelected >= min ? null : { required: true };
      };

      return validator;
}

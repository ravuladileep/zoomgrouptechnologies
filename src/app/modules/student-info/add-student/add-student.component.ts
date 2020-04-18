import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl, FormArray} from '@angular/forms';
import { of } from 'rxjs';
import { StudentService } from '../../../services/student/student.service';
import { ToasterService } from '../../../shared/dialogs/alerts/toaster.service';
import { CommonConstants } from '../../../config/constants';
import { countryList } from '../../../config/countrylist';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  public addStudentForm: FormGroup;
  public branch = [...CommonConstants.branchesDataarr];
  public coursesDataarr = [...CommonConstants.coursesDataarr];
  // public coursePackagearr = [...CommonConstants.coursePackagearr];
  public coursePackageAndNames = [...CommonConstants.coursePackageAndNames];
  public coursesData = [];
  public packageData = [];
  public selectedCoursePackages = [];
  public myar = [];
  public countriesList = [...countryList.countriesList];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private toaster: ToasterService
  ) {
    this.studentForm();
  }

  public selectedList(): void{
    this.addStudentForm.get('coursePackage').valueChanges.subscribe((res) => {
      this.selectedCoursePackages = res.map((v, i) => v ? this.packageData[i] : null)
      .filter(x => x != null)
      .forEach((val) => {
        const myin = this.packageData.indexOf(val);
        this.myar = this.myar.concat(this.coursePackageAndNames[myin].courseNames);
      });
      this.selectedCoursePackages = [...this.myar];
      this.myar = [];
    });
  }

  ngOnInit(): void {
    this.selectedList();
  }

  public studentForm() {
    this.addStudentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      // name: [],
      gender: ['', [Validators.required]],
      mobileNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(CommonConstants.AllowOnlyNumberRegex),
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(CommonConstants.EmailRegex)],
      ],
      address: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      country: [null],
      passport: [''],
      visa: [''],
      rpnumber: [''],
      qualification: ['', [Validators.required]],
      companyName: [''],
      branch: [null, [Validators.required]],
      joiningDate: [new Date(), [Validators.required]],
      courseType: ['course', [Validators.required]],
      courseName: this.fb.array([]),
      coursePackage: this.fb.array([]),
      startingDate: [new Date()],
    });

    of(this.getCourses()).subscribe((res) => {
      this.coursesData = res;
      this.addCheckboxesCourse();
    });
    of(this.getPackage()).subscribe((res) => {
      res.forEach((x) => {
        this.packageData.push(x.packageName);
      });
      this.addCheckboxesPackage();
    });

  }

  getCourses() {
    return [...this.coursesDataarr];
  }

  private addCheckboxesCourse() {
    this.coursesData.forEach((o, i) => {
      const control = new FormControl(); // i===0 if first item set to true, else false
      (this.addStudentForm.controls.courseName as FormArray).push(control);
    });
  }

  getPackage() {
    return [...this.coursePackageAndNames];
  }

  private addCheckboxesPackage() {
    this.packageData.forEach((o, i) => {
      const control = new FormControl(); // i===0 if first item set to true, else false
      (this.addStudentForm.controls.coursePackage as FormArray).push(control);
    });
  }

  get studentData() {
    return this.addStudentForm.controls;
  }


  /**
   * @ function : checkboxMapping
   * @ Purpose  : converting the checkbox values from true/false to value
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public checkboxMapping() {
    this.addStudentForm.value.courseName = this.addStudentForm.value.courseName
      .map((v, i) => (v ? this.coursesData[i] : null))
      .filter((v) => v != null);
    this.addStudentForm.value.coursePackage = this.addStudentForm.value.coursePackage
      .map((v, i) => (v ? this.packageData[i] : null))
      .filter((v) => v != null);
  }

  // public fullName(): void{
  //   const name = this.addStudentForm.get('firstName').value + ' ' + this.addStudentForm.get('lastName').value;
  //   this.addStudentForm.get('name').patchValue(name);
  // }

  /**
   * @ function : Submit()
   * @ Purpose  : submitting the form data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public Submit(): void {
    // this.fullName();
    this.checkboxMapping();
    this.studentService
      .addStudent(this.addStudentForm.value)
      .subscribe((res) => {
        this.toaster.recordAdded();
      });
    console.log(this.addStudentForm.value);
    this.addStudentForm.reset();
  }
}

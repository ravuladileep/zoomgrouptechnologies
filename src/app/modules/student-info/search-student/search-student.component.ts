import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ToasterService } from '../../../shared/dialogs/alerts/toaster.service';
import { StudentService } from '../../../services/student/student.service';
import { CommonConstants } from 'src/app/config/constants';
import { countryList } from 'src/app/config/countrylist';
import { of } from 'rxjs';

@Component({
  selector: 'app-search-student',
  templateUrl: './search-student.component.html',
  styleUrls: ['./search-student.component.css'],
})
export class SearchStudentComponent implements OnInit {
  public searchStudentForm: FormGroup;
  public searchResult;
  public details = false;
  public editStudentForm: FormGroup;
  public branch = [...CommonConstants.branchesDataarr];
  public coursesDataarr = [...CommonConstants.coursesDataarr];
  // public coursePackagearr = [...CommonConstants.coursePackagearr];
  public coursePackageAndNames = [...CommonConstants.coursePackageAndNames];
  public coursesData = [];
  public packageData = [];
  public selectedCoursePackages = [];
  public myar = [];
  public countriesList = [...countryList.countriesList];
  updateid: any;
  public coursePackageData = [];

  constructor(
    private fb: FormBuilder,
    private toaster: ToasterService,
    private studentService: StudentService
  ) {
    this.searchForm();
    this.studentForm();
  }

  ngOnInit(): void {
    this.selectedList();
  }

  // search student form start

  public searchForm(): void {
    this.searchStudentForm = this.fb.group({
      searchBy: ['name'],
      name: [''],
      mobileNumber: [''],
      email: [''],
      courseName: [''],
      studentId: [''],
    });
  }

  get searchData() {
    return this.searchStudentForm.controls;
  }

  public resetForm(): void {
    this.searchStudentForm.reset();
  }

  // search studentform end

  // edit student form start

  public selectedList(): void{
    this.editStudentForm.get('coursePackage').valueChanges.subscribe((res) => {
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


  public studentForm() {
    this.editStudentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      name: [],
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

    this.coursePackageAndNames.map((x) => {
      this.coursePackageData.push(x.packageName);
    });

  }
  getCourses() {
    return [...this.coursesDataarr];
  }

  private addCheckboxesCourse() {
    this.coursesData.forEach((o, i) => {
      const control = new FormControl(); // i===0 if first item set to true, else false
      (this.editStudentForm.controls.courseName as FormArray).push(control);
    });
  }

  getPackage() {
    return [...this.coursePackageAndNames];
  }

  private addCheckboxesPackage() {
    this.packageData.forEach((o, i) => {
      const control = new FormControl(); // i===0 if first item set to true, else false
      (this.editStudentForm.controls.coursePackage as FormArray).push(control);
    });
  }

  get studentData() {
    return this.editStudentForm.controls;
  }

  // edit student form end

  public moreDetails(id): void{
    this.studentService.getStudentById(id).subscribe((res) => {
      this.details = true;
      this.updateid = id;
      this.editStudentForm.patchValue(res);
      this.editStudentForm.controls.joiningDate.patchValue(new Date(res.joiningDate));
      const mybr = this.editStudentForm.controls.courseName as FormArray;
      const myCoursePackage = this.editStudentForm.controls.coursePackage as FormArray;
      // patching checkboxes according to their respective index numbers
      for (let i = 0; i < mybr.length; i++) {
        mybr.at(i).patchValue(null);
      }
      res.courseName.forEach(x => {
        mybr.at(this.coursesDataarr.indexOf(x)).patchValue(x);
      });
      for (let i = 0; i < myCoursePackage.length; i++) {
        myCoursePackage.at(i).patchValue(null);
      }
      res.coursePackage.forEach(x => {
        myCoursePackage.at(this.coursePackageData.indexOf(x)).patchValue(x);
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

  public checkboxMapping(): void{
    this.editStudentForm.value.courseName = this.editStudentForm.value.courseName
      .map((v, i) => (v ? this.coursesData[i] : null))
      .filter((v) => v != null);
    this.editStudentForm.value.coursePackage = this.editStudentForm.value.coursePackage
      .map((v, i) => (v ? this.coursePackageData[i] : null))
      .filter((v) => v != null);
  }

  /**
   * @ function : updateStudent
   * @ Purpose  : updating the student data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public updateStudent(): void{
    this.checkboxMapping();
    this.studentService.updateStudentData(this.updateid, this.editStudentForm.value)
    .subscribe((res) => {
      this.toaster.recordUpdated();
    });
  }

  public submit(): void {
    const key = this.searchStudentForm.controls.searchBy.value;
    const value = this.searchStudentForm.controls[key].value;
    this.studentService
      .getStudentBySearch(key, value)
      .subscribe((res) => (this.searchResult = res));
  }
}

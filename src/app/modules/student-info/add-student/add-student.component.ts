import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../../../services/student/student.service';
import { ToasterService } from '../../../shared/dialogs/alerts/toaster.service';
import { CommonConstants } from '../../../config/constants';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  public addStudentForm: FormGroup;
  public branch = [...CommonConstants.branchesDataarr];
  public coursesDataarr = [...CommonConstants.coursesDataarr];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private toaster: ToasterService
  ) {
    this.studentForm();
  }
  ngOnInit(): void {}

  public studentForm() {
    this.addStudentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
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
      qualification: ['', [Validators.required]],
      companyName: [''],
      branch: [null, [Validators.required]],
      joiningDate: [new Date(), [Validators.required]],
      courseType: ['course', [Validators.required]],
      courseName: ['', [Validators.required]],
      startingDate: [new Date(), [Validators.required]],
    });
  }

  get studentData() {
    return this.addStudentForm.controls;
  }

  /**
   * @ function : Submit()
   * @ Purpose  : submitting the form data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public Submit(): void {
    this.studentService
      .addStudent(this.addStudentForm.value)
      .subscribe((res) => {
        this.toaster.recordAdded();
      });
    console.log(this.addStudentForm.value);
    this.addStudentForm.reset();
  }
}

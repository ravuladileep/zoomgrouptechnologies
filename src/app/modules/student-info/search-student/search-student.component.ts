import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToasterService } from '../../../shared/dialogs/alerts/toaster.service';
import { StudentService } from '../../../services/student/student.service';

@Component({
  selector: 'app-search-student',
  templateUrl: './search-student.component.html',
  styleUrls: ['./search-student.component.css'],
})
export class SearchStudentComponent implements OnInit {
  public searchStudentForm: FormGroup;
  public searchResult;

  constructor(
    private fb: FormBuilder,
    private toaster: ToasterService,
    private studentService: StudentService
  ) {
    this.searchForm();
  }

  ngOnInit(): void {}

  public searchForm(): void {
    this.searchStudentForm = this.fb.group({
      searchBy: ['name'],
      name: [''],
      mobileNumber: [''],
      email: [''],
      course: [''],
      studentId: [''],
    });
  }

  get searchData() {
    return this.searchStudentForm.controls;
  }

  public resetForm(): void {
    this.searchStudentForm.reset();
  }

  public submit(): void {
    const key = this.searchStudentForm.controls.searchBy.value;
    const value = this.searchStudentForm.controls[key].value;
    this.studentService
      .getStudentBySearch(key, value)
      .subscribe((res) => (this.searchResult = res));
  }
}

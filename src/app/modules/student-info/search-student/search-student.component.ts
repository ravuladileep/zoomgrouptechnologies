import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToasterService } from 'src/app/shared/dialogs/alerts/toaster.service';

@Component({
  selector: 'app-search-student',
  templateUrl: './search-student.component.html',
  styleUrls: ['./search-student.component.css']
})
export class SearchStudentComponent implements OnInit {

  public searchStudentForm: FormGroup;

  constructor(private fb: FormBuilder,  private toaster: ToasterService) {
    this.searchForm();
  }

  ngOnInit(): void {
  }

  public searchForm() {
    this.searchStudentForm = this.fb.group({
      searchBy: ['name'],
      name: [''],
      phone: [''],
      email: [''],
      course: [''],
      studentId: ['']
    });
  }

  get searchData() {
    return this.searchStudentForm.controls;
  }

  public resetForm(): void{
    this.searchStudentForm.reset();
  }

  public submit(): void {
  }

}

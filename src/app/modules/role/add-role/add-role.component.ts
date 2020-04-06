import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ToasterService } from 'src/app/shared/dialogs/alerts/toaster.service';
import { of } from 'rxjs';
import { RoleService } from 'src/app/services/role/role.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  public addRoleSpecificForm: FormGroup;
  public assignFunctionDataarr = ['Add Branch',
  'Add Course',
  'Add Course Fee',
  'Add Course Package',
  'Add Course Schedule',
  'Add Employee',
  'Add Role',
  'Add Student',
  'Edit Branch',
  'Edit Course',
  'Edit Course Fee',
  'Edit Course Package',
  'Edit Course Schedule',
  'Edit Employee',
  'Edit Role',
  'Edit Student',
  'Search Student',
  'Student Image Upload'];
  public reportsDataarr = [
    'Accountant Report',
    'Attandance Sheet',
    'Cancel Receipt',
    'Course Specific Report',
    'Cousellor Report',
    'Deleted Student',
    'Details of students registered Report',
    'Generate ID Card',
    'Payment Report',
    'Payment Status',
    'Print Certificate',
    'Print Fee Receipt',
    'Receipt Status',
    'Student Enrolled Report',
    'Student Not Enrolled Report',
    'Total Admission Report'
    ];
  public communicationDataarr = ['SMS', 'Email'];
  public assignFunctionData = [];
  public reportsData = [];
  public communicationData = [];

  constructor(private fb: FormBuilder, private roleService: RoleService, private toaster: ToasterService) {
    this.roleForm();
  }

  ngOnInit(): void {}

  public roleForm(): void {
    this.addRoleSpecificForm = this.fb.group({
      roleName: ['', [Validators.required]],
      assignFunction: this.fb.array([], minSelectedCheckboxes(1)),
      reports: this.fb.array([], minSelectedCheckboxes(1)),
      communication: this.fb.array([], minSelectedCheckboxes(1))
    });

    // async orders
    of(this.getAssignFunction()).subscribe(res => {
      this.assignFunctionData = res;
      this.addCheckboxesAssignFunction();
    });

    of(this.getReports()).subscribe(res => {
      this.reportsData = res;
      this.addCheckboxesReports();
    });

    of(this.getCommunication()).subscribe(res => {
      this.communicationData = res;
      this.addCheckboxesCommunication();
    });
    // synchronous orders
    // this.orders = this.getBranches();
    // this.addCheckboxesbranch();

  }

  private addCheckboxesAssignFunction() {
    this.assignFunctionData.forEach((o, i) => {
      const control = new FormControl(); // i===0 if first item set to true, else false
      (this.addRoleSpecificForm.controls.assignFunction as FormArray).push(control);
    });
  }

  getAssignFunction() {
    return [...this.assignFunctionDataarr];
  }

  private addCheckboxesReports() {
    this.reportsData.forEach((o, i) => {
      const control = new FormControl(); // i===0 if first item set to true, else false
      (this.addRoleSpecificForm.controls.reports as FormArray).push(control);
    });
  }


  getReports() {
    return [...this.reportsDataarr];
  }

  private addCheckboxesCommunication() {
    this.communicationData.forEach((o, i) => {
      const control = new FormControl(); // i===0 if first item set to true, else false
      (this.addRoleSpecificForm.controls.communication as FormArray).push(control);
    });
  }


  getCommunication() {
    return [...this.communicationDataarr];
  }

  get roleData() {
    return this.addRoleSpecificForm.controls;
  }


  /**
   * @ function : checkboxMapping
   * @ Purpose  : converting the checkbox values from true/false to value
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */
  public checkboxMapping() {
    this.addRoleSpecificForm.value.assignFunction = this.addRoleSpecificForm.value.assignFunction
    .map((v, i) => (v ? this.assignFunctionData[i] : null))
    .filter(v => v != null);

    this.addRoleSpecificForm.value.reports = this.addRoleSpecificForm.value.reports
    .map((v, i) => (v ? this.reportsData[i] : null))
    .filter(v => v != null);

    this.addRoleSpecificForm.value.communication = this.addRoleSpecificForm.value.communication
    .map((v, i) => (v ? this.communicationData[i] : null))
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
    this.roleService.addRole(this.addRoleSpecificForm.value).subscribe((res) => {
      this.toaster.recordAdded();
    });
    this.addRoleSpecificForm.reset();
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

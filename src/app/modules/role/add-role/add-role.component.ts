import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { RoleService } from '../../../services/role/role.service';
import { ToasterService } from '../../../shared/dialogs/alerts/toaster.service';
import { CommonConstants } from '../../../config/constants';
import { CustomValidators } from '../../../shared/directives/checkboxmin.validator';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AddRoleComponent implements OnInit {
  public addRoleSpecificForm: FormGroup;
  public assignFunctionDataarr = [...CommonConstants.assignFunctionDataarr];
  public reportsDataarr = [...CommonConstants.reportsDataarr];
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
      assignFunction: this.fb.array([], CustomValidators.multipleCheckboxRequireOne),
      reports: this.fb.array([], CustomValidators.multipleCheckboxRequireOne),
      communication: this.fb.array([], CustomValidators.multipleCheckboxRequireOne)
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

  /**
   * @ function : addCheckboxesAssignFunction&getAssignFunction
   * @ Purpose  : adding checkboxes to the formarray
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

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
   * @ function : submit
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


import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidatorFn, FormArray, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { RoleService } from '../../../services/role/role.service';
import { ToasterService } from '../../../shared/dialogs/alerts/toaster.service';
import { CommonConstants } from '../../../config/constants';
import { CustomValidators } from '../../../shared/directives/checkboxmin.validator';
declare var $: any;

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;
  public roleDatalist = [];
  public updateRoleSpecificForm: FormGroup;
  public updateid: any;
  public assignFunctionDataarr = [...CommonConstants.assignFunctionDataarr];
  public reportsDataarr = [...CommonConstants.reportsDataarr];
  public communicationDataarr = ['SMS', 'Email'];
  public assignFunctionData = [];
  public reportsData = [];
  public communicationData = [];
  public term: any;
  public showEntries;
  public p = 1;


  //  orderBy data
  public records = this.roleDatalist;
  public isDesc = false;
  public column;
  public direction: number;

  constructor(
    private roleService: RoleService,
    private fb: FormBuilder,
    private toaster: ToasterService
  ) {
    this.updateRoleForm();
  }

  ngOnInit(): void {
    this.loadRoleData();
  }

  public updateRoleForm(): void {
    this.updateRoleSpecificForm = this.fb.group({
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
      // this.addCheckboxes();

  }

  private addCheckboxesAssignFunction() {
    this.assignFunctionData.forEach((o, i) => {
      const control = new FormControl(); // i===0 if first item set to true, else false
      (this.updateRoleSpecificForm.controls.assignFunction as FormArray).push(control);
    });
  }

  getAssignFunction() {
    return [...this.assignFunctionDataarr];
  }

  private addCheckboxesReports() {
    this.reportsData.forEach((o, i) => {
      const control = new FormControl(); // i===0 if first item set to true, else false
      (this.updateRoleSpecificForm.controls.reports as FormArray).push(control);
    });
  }


  getReports() {
    return [...this.reportsDataarr];
  }

  private addCheckboxesCommunication() {
    this.communicationData.forEach((o, i) => {
      const control = new FormControl(); // i===0 if first item set to true, else false
      (this.updateRoleSpecificForm.controls.communication as FormArray).push(control);
    });
  }


  getCommunication() {
    return [...this.communicationDataarr];
  }

  get roleData() {
    return this.updateRoleSpecificForm.controls;
  }



  /**
   * @ function : loadRoleData
   * @ Purpose  : fetching the branchdata
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public loadRoleData(): void {
    this.roleService.getRoleData().subscribe(res => {
      this.roleDatalist = res;
      this.showEntries = this.roleDatalist.length;
    });
  }

  /**
   * @ function : changeCount
   * @ Purpose  : items per page
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public changeCount(event): void {
    this.p = 1;
    this.showEntries = event.target.value;
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
   * @ function : editRole
   * @ Purpose  : getRoleDataById & assigning to form fields
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public editRole(data): void {
    this.roleService.getRoleById(data.id).subscribe(res => {
      this.updateid = data.id;
      this.updateRoleSpecificForm.patchValue(res);
      const myassign = this.updateRoleSpecificForm.controls.assignFunction as FormArray;
      const myreports = this.updateRoleSpecificForm.controls.reports as FormArray;
      const mycommunication = this.updateRoleSpecificForm.controls.communication as FormArray;
      // patching checkboxes according to their respective index numbers
      // for assign functions
      for (let i = 0; i < myassign.length; i++) {
        myassign.at(i).patchValue(null);
      }
      res.assignFunction.forEach(x => {
        myassign.at(this.assignFunctionDataarr.indexOf(x)).patchValue(x);
      });
      // for reports
      for (let i = 0; i < myreports.length; i++) {
        myreports.at(i).patchValue(null);
      }
      res.reports.forEach(x => {
        myreports.at(this.reportsDataarr.indexOf(x)).patchValue(x);
      });
      // for communication
      for (let i = 0; i < mycommunication.length; i++) {
        mycommunication.at(i).patchValue(null);
      }
      res.communication.forEach(x => {
        mycommunication.at(this.communicationDataarr.indexOf(x)).patchValue(x);
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
    this.updateRoleSpecificForm.value.assignFunction = this.updateRoleSpecificForm.value.assignFunction
    .map((v, i) => (v ? this.assignFunctionData[i] : null))
    .filter(v => v != null);

    this.updateRoleSpecificForm.value.reports = this.updateRoleSpecificForm.value.reports
    .map((v, i) => (v ? this.reportsData[i] : null))
    .filter(v => v != null);

    this.updateRoleSpecificForm.value.communication = this.updateRoleSpecificForm.value.communication
    .map((v, i) => (v ? this.communicationData[i] : null))
    .filter(v => v != null);

  }


  /**
   * @ function : updateRole
   * @ Purpose  : updating the role data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public updateRole(): void {
    this.checkboxMapping();
    this.roleService
      .updateRoleData(this.updateid, this.updateRoleSpecificForm.value)
      .subscribe(res => {
        this.loadRoleData();
        this.toaster.recordUpdated();
      });
    $(this.modal.nativeElement).click();
  }

  /**
   * @ function : deleteRole
   * @ Purpose  : deleting the role data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public deleteRole(data): void {
    if (confirm('This role deleted permanently')) {
      this.roleService.deleteRole(data.id).subscribe(res => {
      this.loadRoleData();
      this.toaster.recordDeleted();
      });
    }
  }

}



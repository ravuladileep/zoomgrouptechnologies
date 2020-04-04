import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidatorFn, FormArray, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { ToasterService } from 'src/app/shared/dialogs/alerts/toaster.service';
import { RoleService } from 'src/app/services/role/role.service';
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
  public sortedData: any;
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
  public term: any;

  //  orderBy data
  public records = this.sortedData;
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
      assignFunction: this.fb.array([]),
      reports: this.fb.array([]),
      communication: this.fb.array([])
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
      this.sortedData = [...this.roleDatalist];
    });
  }

  /**
   * @ function : sortData
   * @ Purpose  : sorting the branchdata
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public sortData(event) {
    this.sortedData = [...this.roleDatalist];
    if (event.target.value === 'all') {
      this.sortedData = [...this.roleDatalist];
    }
    if (this.sortedData.length >= event.target.value) {
      return (this.sortedData.length = event.target.value);
    }
    return (this.sortedData = [...this.roleDatalist]);
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
    .map((v, i) => (v ? this.assignFunctionData[i] : null));
    this.updateRoleSpecificForm.value.reports = this.updateRoleSpecificForm.value.reports
    .map((v, i) => (v ? this.reportsData[i] : null));
    this.updateRoleSpecificForm.value.communication = this.updateRoleSpecificForm.value.communication
    .map((v, i) => (v ? this.communicationData[i] : null));
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


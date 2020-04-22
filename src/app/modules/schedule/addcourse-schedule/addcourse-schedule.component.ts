import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn} from '@angular/forms';
import { of } from 'rxjs';
import { ScheduleService } from '../../../services/schedule/schedule.service';
import { ToasterService } from '../../../shared/dialogs/alerts/toaster.service';
import { CommonConstants } from '../../../config/constants';
import { CustomValidators } from '../../../shared/directives/checkboxmin.validator';
import { FormCanDeactivate } from '../../../core/guards/candeactivate/form-can-deactivate';

@Component({
  selector: 'app-addcourse-schedule',
  templateUrl: './addcourse-schedule.component.html',
  styleUrls: ['./addcourse-schedule.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AddcourseScheduleComponent extends FormCanDeactivate implements OnInit {
  public addScheduleSpecificForm: FormGroup;
  public coursesDataarr = [...CommonConstants.coursesDataarr];
  public branchesDataarr = [...CommonConstants.branchesDataarr];
  public batchesDataarr = ['Morning', 'Afternoon', 'Evening'];
  public branchesData = [];
  public batchesData = [];
  public bsValue = new Date();

  constructor(private fb: FormBuilder, private scheduleService: ScheduleService, private toaster: ToasterService) {
    super();
    this.scheduleForm();
  }

  ngOnInit(): void {
    this.formCanDeactivate = this.addScheduleSpecificForm;
  }

  public scheduleForm(): void {
    this.addScheduleSpecificForm = this.fb.group({
      courseName: [null, [Validators.required]],
      branch: this.fb.array([], CustomValidators.multipleCheckboxRequireOne),
      startDate: [this.bsValue, [Validators.required]],
      endDate: ['', [Validators.required]],
      batch: this.fb.array([], CustomValidators.multipleCheckboxRequireOne)
    });

    // async orders
    of(this.getBranches()).subscribe(res => {
      this.branchesData = res;
      this.addCheckboxesBranch();
    });

    of(this.getBatches()).subscribe(res => {
      this.batchesData = res;
      this.addCheckboxesBatch();
    });

    // synchronous orders
    // this.orders = this.getBranches();
    // this.addCheckboxes();
  }

  private addCheckboxesBranch() {
    this.branchesData.forEach((o, i) => {
      const control = new FormControl(); // i===0 if first item set to true, else false
      (this.addScheduleSpecificForm.controls.branch as FormArray).push(control);
    });
  }

  private addCheckboxesBatch() {
    this.batchesData.forEach((o, i) => {
      const control = new FormControl(); // i===0 if first item set to true, else false
      (this.addScheduleSpecificForm.controls.batch as FormArray).push(control);
    });
  }

  getBranches() {
    return [...this.branchesDataarr];
  }
  getBatches() {
    return [...this.batchesDataarr];
  }

  get scheduleData() {
    return this.addScheduleSpecificForm.controls;
  }

  /**
   * @ function : checkboxMapping
   * @ Purpose  : converting the checkbox values from true/false to originalValue
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */
  public checkboxMapping() {
    this.addScheduleSpecificForm.value.branch = this.addScheduleSpecificForm.value.branch
    .map((v, i) => (v ? this.branchesData[i] : null))
    .filter(v => v != null);

    this.addScheduleSpecificForm.value.batch = this.addScheduleSpecificForm.value.batch
    .map((v, i) => (v ? this.batchesData[i] : null))
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
    this.scheduleService.addSchedule(this.addScheduleSpecificForm.value).subscribe((res) => {
      this.toaster.recordAdded();
    });
    console.log(this.addScheduleSpecificForm.value);
    this.addScheduleSpecificForm.reset();
  }

}



import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidatorFn, FormArray, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { ScheduleService } from '../../../services/schedule/schedule.service';
import { ToasterService } from '../../../shared/dialogs/alerts/toaster.service';
import { CommonConstants } from '../../../config/constants';
declare var $: any;

@Component({
  selector: 'app-editcourse-schedule',
  templateUrl: './editcourse-schedule.component.html',
  styleUrls: ['./editcourse-schedule.component.css']
})
export class EditcourseScheduleComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;
  public coursesDataarr = [...CommonConstants.coursesDataarr];
  public branchesDataarr = [...CommonConstants.branchesDataarr];
  public batchesDataarr = ['Morning', 'Afternoon', 'Evening'];
  public coursePackageDatalist = [];
  public updateScheduleSpecificForm: FormGroup;
  public updateid: any;
  public branchesData = [];
  public batchesData = [];
  public term: any;
  public p = 1;


  //  orderBy data
  public records = this.coursePackageDatalist;
  public isDesc = false;
  public column;
  public direction: number;

  constructor(
    private scheduleService: ScheduleService,
    private fb: FormBuilder,
    private toaster: ToasterService
  ) {
    this.scheduleForm();
  }

  ngOnInit(): void {
    this.loadScheduleData();
  }

  public scheduleForm(): void {
    this.updateScheduleSpecificForm = this.fb.group({
      courseName: ['', [Validators.required]],
      branch: this.fb.array([]),
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      batch: this.fb.array([])
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
      (this.updateScheduleSpecificForm.controls.branch as FormArray).push(control);
    });
  }

  private addCheckboxesBatch() {
    this.batchesData.forEach((o, i) => {
      const control = new FormControl(); // i===0 if first item set to true, else false
      (this.updateScheduleSpecificForm.controls.batch as FormArray).push(control);
    });
  }

  getBranches() {
    return [...this.branchesDataarr];
  }
  getBatches() {
    return [...this.batchesDataarr];
  }

  get scheduleData() {
    return this.updateScheduleSpecificForm.controls;
  }



  /**
   * @ function : loadScheduleData
   * @ Purpose  : fetching the branchdata
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public loadScheduleData(): void {
    this.scheduleService.getScheduleData().subscribe(res => {
      this.coursePackageDatalist = res;
    });
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
   * @ function : editCoursedata
   * @ Purpose  : getCourseDataById & assigning to form fields
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public editSchedule(data): void {
    this.scheduleService.getScheduleById(data.id).subscribe(res => {
      this.updateid = data.id;
      this.updateScheduleSpecificForm.patchValue(res);
      this.updateScheduleSpecificForm.controls.startDate.patchValue(new Date(res.startDate));
      this.updateScheduleSpecificForm.controls.endDate.patchValue(new Date(res.endDate));
      const mybr = this.updateScheduleSpecificForm.controls.branch as FormArray;
      const mybt = this.updateScheduleSpecificForm.controls.batch as FormArray;
      // patching checkboxes according to their respective index numbers
      // for branches
      for (let i = 0; i < mybr.length; i++) {
        mybr.at(i).patchValue(null);
      }
      res.branch.forEach(x => {
        mybr.at(this.branchesDataarr.indexOf(x)).patchValue(x);
      });
      // for batches
      for (let i = 0; i < mybt.length; i++) {
        mybt.at(i).patchValue(null);
      }
      res.batch.forEach(x => {
        mybt.at(this.batchesDataarr.indexOf(x)).patchValue(x);
      });
      // end patching
    });
  }

  /**
   * @ function : checkboxMapping
   * @ Purpose  : converting the checkbox values from true/false to originalValue
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */
  public checkboxMapping() {
    this.updateScheduleSpecificForm.value.branch = this.updateScheduleSpecificForm.value.branch
    .map((v, i) => (v ? this.branchesData[i] : null))
    .filter(v => v != null);
    this.updateScheduleSpecificForm.value.batch = this.updateScheduleSpecificForm.value.batch
    .map((v, i) => (v ? this.batchesData[i] : null))
    .filter(v => v != null);
  }



  /**
   * @ function : updateCourse
   * @ Purpose  : updating the Course data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public updateSchedule(): void {
    this.checkboxMapping();
    this.scheduleService
      .updateScheduleData(this.updateid, this.updateScheduleSpecificForm.value)
      .subscribe(res => {
        this.loadScheduleData();
        this.toaster.recordUpdated();
      });
    $(this.modal.nativeElement).click();
  }

  /**
   * @ function : deleteCoursedata
   * @ Purpose  : deleting the course data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public deleteSchedule(data): void {
    if (confirm('This course deleted permanently')) {
      this.scheduleService.deleteSchedule(data.id).subscribe(res => {
      this.loadScheduleData();
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

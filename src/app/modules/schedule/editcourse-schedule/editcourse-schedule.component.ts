import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidatorFn, FormArray, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { ToasterService } from 'src/app/shared/dialogs/alerts/toaster.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
declare var $: any;

@Component({
  selector: 'app-editcourse-schedule',
  templateUrl: './editcourse-schedule.component.html',
  styleUrls: ['./editcourse-schedule.component.css']
})
export class EditcourseScheduleComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;
  public coursesDataarr = [
    'CCNA',
    'MCSE - Windows Server 2012',
    'LINUX Administration',
    'EXCHANGE SERVER 2013',
    'CCNP',
    'VMware (old)',
    'CISCO ASA Firewall + CISCO IPS',
    'CCNA (Security)',
    'Private Cloud',
    'LINUX - Advanced',
    'VMware Cloud',
    'CCIE (Routing & Switching)',
    'Batch Shifting Charges',
    'MCSE-2012 (Old)',
    'Workshop on emerging Technologies',
    'Certificate-old',
    'EHCE US-Council',
    'VMware vSphere 6.0',
    'CHECKPOINT FIREWALL',
    'CCIE (R&S)',
    'CCIE (R&S) BOOT CAMP',
    'MCSE 2012 One to One Training',
    'Certificate-1No.',
    'Certificate - 2 No.s',
    'Certificate - 3No.s',
    'Certificate - 4 No.s',
    'Certificate - 5 No.s',
    'Microsoft Private Cloud',
    'Amazon Web Services',
    'MCP 1 Voucher',
    'MCP 2 Voucher',
    'MCP 3 Voucher',
    'MCP 4 Voucher',
    'MCP 5 Voucher',
    'CCNA Weekend Batch',
    'CCNA One to One',
    'Microsoft MCP Voucher 1',
    'Microsoft MCP Voucher 2',
    'Microsoft MCP Voucher 3',
    'Microsoft MCP Voucher 4',
    'Microsoft MCP Voucher 5',
    'CCNP Weekend',
    'Microsoft AZURE',
    'LINUX Weekend',
    'AWS Weekend',
    'DevOps',
    'MCSA - Windows Server 2016',
    'Linux one to one',
    'EHCE - Ethical Hacking & Countermeasures Expert',
    'AWS One to One',
    'VMWARE',
    'Online Classroom Training - CCNA-V3.0',
    'Online Classroom Training - MCSE Server 2012',
    'Online Classroom Training - LINUX',
    'Online Classroom Training - LINUX-Advanced',
    'Online Classroom Training - Amazon Web Services',
    'Online Classroom Training - Microsoft AZURE',
    'ccna security weekend',
    'CCNP - Routing & Switching',
    'checkpoint Firewall (Bootcamp)',
    'Microsoft Office 365',
    'Hardware and Networking',
    'Online Classroom Training - CCNA Security',
    'Online Classroom Training - ASA Firewalls',
    'Ethical Hacking and Prevention',
    'Cybersecurity Professional',
    'Computer Hardware',
    'MCSE - 2012 (NP)',
    'MCSE - 2012 (CA)',
    'MCSE - 2012 (CP)',
    'MCSE (Server Infrastructure)',
    'MCSE (CA)',
    'MCSE (CP)',
    'LINUX',
    'CCNA - V3.0',
    'Cisco Security',
    'Ethical Hacking & Prevention',
    'CCNA R&S and Cisco Security',
    'MCSE and LINUX Administration',
    'CCNP+CCIE (Routing and Switching)',
    'VMware vSphere + vCloud',
    'Linux Professional',
    'MCSE One to One July 2019',
    'CCNA R&S One to One July 2019',
    'Office 365 New',
    'MCSE-VJW',
    'CCNA-VJW',
    'Linux-VJW',
    'Ethical Hacking & Prevention -VJW',
    'Cybersecurity Professional -VJW'
  ];
  public coursePackageDatalist = [];
  public updateScheduleSpecificForm: FormGroup;
  public updateid: any;
  public sortedData: any;
  public branchesDataarr = ['Ameerpet', 'Banjara Hills', 'Dilsukh nagar', 'Secunderabad', 'Test linux', 'Surat', 'Vijayawada'];
  // public branchesDataarr = [
  //   { id: 'Ameerpet', name: 'Ameerpet' },
  //   { id: 'Banjara Hills', name: 'Banjara Hills' },
  //   { id: 'Dilsukh nagar', name: 'Dilsukh nagar' },
  //   { id: 'Secunderabad', name: 'Secunderabad' },
  //   { id: 'Test linux', name: 'Test linux' },
  //   { id: 'Surat', name: 'Surat' },
  //   { id: 'Vijayawada', name: 'Vijayawada' }
  // ];
  public batchesDataarr = ['Morning', 'Afternoon', 'Evening'];
  public branchesData = [];
  public batchesData = [];
  public term: any;

  //  orderBy data
  public records = this.sortedData;
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
      this.sortedData = [...this.coursePackageDatalist];
    });
  }

  /**
   * @ function : sortData
   * @ Purpose  : sorting the branchdata
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public sortData(event) {
    this.sortedData = [...this.coursePackageDatalist];
    if (event.target.value === 'all') {
      this.sortedData = [...this.coursePackageDatalist];
    }
    if (this.sortedData.length >= event.target.value) {
      return (this.sortedData.length = event.target.value);
    }
    return (this.sortedData = [...this.coursePackageDatalist]);
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

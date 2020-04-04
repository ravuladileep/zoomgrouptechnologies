import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn} from '@angular/forms';
import { of } from 'rxjs';
import { ToasterService } from 'src/app/shared/dialogs/alerts/toaster.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';

@Component({
  selector: 'app-addcourse-schedule',
  templateUrl: './addcourse-schedule.component.html',
  styleUrls: ['./addcourse-schedule.component.css']
})
export class AddcourseScheduleComponent implements OnInit {
  public addScheduleSpecificForm: FormGroup;
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
  public branchesDataarr = [
    { id: 'Ameerpet', name: 'Ameerpet' },
    { id: 'Banjara Hills', name: 'Banjara Hills' },
    { id: 'Dilsukh nagar', name: 'Dilsukh nagar' },
    { id: 'Secunderabad', name: 'Secunderabad' },
    { id: 'Test linux', name: 'Test linux' },
    { id: 'Surat', name: 'Surat' },
    { id: 'Vijayawada', name: 'Vijayawada' }
  ];
  public batchesDataarr = ['Morning', 'Afternoon', 'Evening'];
  public branchesData = [];
  public batchesData = [];
  public bsValue = new Date();

  constructor(private fb: FormBuilder, private scheduleService: ScheduleService, private toaster: ToasterService) {
    this.scheduleForm();
  }

  ngOnInit(): void {}

  public scheduleForm(): void {
    this.addScheduleSpecificForm = this.fb.group({
      courseName: ['', [Validators.required]],
      branch: this.fb.array([]),
      startDate: [this.bsValue, [Validators.required]],
      endDate: ['', [Validators.required]],
      batch: this.fb.array([], minSelectedCheckboxes(1))
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
    .map((v, i) => (v ? this.branchesData[i].id : null));
    this.addScheduleSpecificForm.value.batch = this.addScheduleSpecificForm.value.batch
    .map((v, i) => (v ? this.batchesData[i] : null));
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

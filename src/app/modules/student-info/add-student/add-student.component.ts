import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToasterService } from 'src/app/shared/dialogs/alerts/toaster.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  public addStudentForm: FormGroup;
  public branch = ['Ameerpet', 'Banjara Hills', 'Dilsukh nagar', 'Secunderabad', 'Test linux', 'Surat', 'Vijayawada'];
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


  constructor(private fb: FormBuilder,  private toaster: ToasterService) {
    this.studentForm();
  }
  ngOnInit(): void {}

  public studentForm() {
    this.addStudentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      qualification: ['', [Validators.required]],
      companyName: [''],
      branch: [null, [Validators.required]],
      joiningDate: [new Date(), [Validators.required]],
      courseType: ['course', [Validators.required]],
      courseName: ['', [Validators.required]],
      selectDate: [new Date(), [Validators.required]],
    });
  }

  get studentData() {
    return this.addStudentForm.controls;
  }

  /**
   * @ function : Submit()
   * @ Purpose  : submitting the form data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public Submit(): void {
    // this.branchService
    //   .addBranch(this.branchSpecificData.value)
    //   .subscribe(res => {
    //     this.toaster.recordAdded();
    //   });
    console.log(this.addStudentForm.value);
    this.addStudentForm.reset();
  }
}

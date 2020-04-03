import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Iuser } from 'src/app/entities/user.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToasterService } from 'src/app/shared/dialogs/alerts/toaster.service';

declare var $: any;

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;
  public branches = ['Ameerpet', 'Banjara Hills', 'Dilsukh nagar', 'Secunderabad', 'Test Linux', 'Surat', 'Vijayawada'];
  public roles = ['Admin', 'Counsellor', 'Accountant', 'Counsellor Plus', 'Finance', 'Audit', 'Telephonic'];
  public userDatalist: Iuser[] = [];
  public updateuserSpecificData: FormGroup;
  public updateid: any;
  public sortedData: any;
  public term: any;

  //  orderBy data
  public records = this.sortedData;
  public isDesc = false;
  public column;
  public direction: number;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toaster: ToasterService
  ) {
    this.userForm();
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  public userForm(): void {
    this.updateuserSpecificData = this.fb.group({
      userEmail: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      role: [null, [Validators.required]],
      branch: [null, [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get userData() {
    return this.updateuserSpecificData.controls;
  }

  /**
   * @ function : loadUserData
   * @ Purpose  : fetching the userdata
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public loadUserData(): void {
    this.userService.getuserData().subscribe(res => {
      this.userDatalist = res;
      this.sortedData = [...this.userDatalist];
    });
  }

  /**
   * @ function : sortData
   * @ Purpose  : sorting the userdata
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public sortData(event) {
    this.sortedData = [...this.userDatalist];
    if (event.target.value === 'all') {
      this.sortedData = [...this.userDatalist];
    }
    if (this.sortedData.length >= event.target.value) {
      return (this.sortedData.length = event.target.value);
    }
    return (this.sortedData = [...this.userDatalist]);
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
   * @ function : edituserdata
   * @ Purpose  : getuserDataById & assigning to form fields
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public editUserData(data): void {
    this.userService.getuserById(data.id).subscribe(res => {
      this.updateid = data.id;
      this.updateuserSpecificData.patchValue(res);
    });
  }

  /**
   * @ function : updateuser
   * @ Purpose  : updating the user data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public updateUser(): void {
    this.userService
      .updateuserData(this.updateid, this.updateuserSpecificData.value)
      .subscribe(res => {
        this.loadUserData();
        this.toaster.recordUpdated();
      });
    $(this.modal.nativeElement).click();
  }

  /**
   * @ function : deleteuserdata
   * @ Purpose  : deleting the user data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public deleteUserData(data): void {
    if (confirm('This user deleted permanently')) {
      this.userService.deleteuser(data.id).subscribe(res => {
        this.loadUserData();
        this.toaster.recordDeleted();
      });
    }
  }

}

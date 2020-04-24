import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ToasterService } from '../../../shared/dialogs/alerts/toaster.service';
import { UserService } from '../../../services/user/user.service';
import { CommonConstants } from '../../../config/constants';
import { FormCanDeactivate } from '../../../core/guards/candeactivate/form-can-deactivate';

@UntilDestroy()
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AddEmployeeComponent extends FormCanDeactivate implements OnInit {
  public userSpecificData: FormGroup;
  public branches = [...CommonConstants.branchesDataarr];
  public roles = [
    'Admin',
    'Counsellor',
    'Accountant',
    'Counsellor Plus',
    'Finance',
    'Audit',
    'Telephonic',
  ];
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toaster: ToasterService
  ) {
    super();
    this.addUserForm();
  }
  ngOnInit(): void {
    this.formCanDeactivate = this.userSpecificData;
  }

  public addUserForm() {
    this.userSpecificData = this.fb.group({
      userEmail: [
        '',
        [Validators.required, Validators.pattern(CommonConstants.EmailRegex)],
      ],
      fullName: ['', [Validators.required]],
      role: [null, [Validators.required]],
      branch: [null, [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get userData() {
    return this.userSpecificData.controls;
  }

  /**
   * @ function : Submit()
   * @ Purpose  : submitting the form data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public Submit(): void {
    this.userService
      .adduser(this.userSpecificData.value)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.toaster.recordAdded();
      });
    this.userSpecificData.reset();
  }
}

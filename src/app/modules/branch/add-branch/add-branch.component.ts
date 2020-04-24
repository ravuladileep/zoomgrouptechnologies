import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { BranchService } from '../../../services/branch/branch.service';
import { ToasterService } from '../../../shared/dialogs/alerts/toaster.service';
import { CommonConstants } from '../../../config/constants';
import { FormCanDeactivate } from '../../../core/guards/candeactivate/form-can-deactivate';

@UntilDestroy()
@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AddBranchComponent extends FormCanDeactivate
  implements OnInit, OnDestroy {
  public branchSpecificData: FormGroup;

  constructor(
    private fb: FormBuilder,
    private branchService: BranchService,
    private toaster: ToasterService
  ) {
    super();
    this.addbranchform();
  }

  ngOnInit(): void {
    this.formCanDeactivate = this.branchSpecificData;
  }

  public addbranchform() {
    this.branchSpecificData = this.fb.group({
      branchName: ['', [Validators.required]],
      branchCode: ['', [Validators.required]],
      branchAddress: ['', [Validators.required]],
      branchContactNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(CommonConstants.AllowOnlyNumberRegex),
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
    });
  }

  get branchData() {
    return this.branchSpecificData.controls;
  }

  /**
   * @ function : Submit()
   * @ Purpose  : submitting the form data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public Submit(): void {
    this.branchService
      .addBranch(this.branchSpecificData.value)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.toaster.recordAdded();
      });
    this.branchSpecificData.reset();
  }

  // untilDestroy will work withOut presence of ngDestroy()
  ngOnDestroy(): void {}
}

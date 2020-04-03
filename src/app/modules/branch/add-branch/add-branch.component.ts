import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { BranchService } from 'src/app/services/branch/branch.service';
import { ToasterService } from 'src/app/shared/dialogs/alerts/toaster.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {
  public branchSpecificData: FormGroup;

  constructor(private fb: FormBuilder, private branchService: BranchService, private toaster: ToasterService) {
    this.addbranchform();
  }
  ngOnInit(): void {}

  public addbranchform() {
    this.branchSpecificData = this.fb.group({
      branchName: ['', [Validators.required]],
      branchCode: ['', [Validators.required]],
      branchAddress: ['', [Validators.required]],
      branchContactNumber: ['', [Validators.required]]
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
      .subscribe(res => {
        this.toaster.recordAdded();
      });
    this.branchSpecificData.reset();
  }
}

import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IBranch } from '../../../entities/branch.model';
import { BranchService } from '../../../services/branch/branch.service';
import { ToasterService } from '../../../shared/dialogs/alerts/toaster.service';
import { CommonConstants } from '../../../config/constants';

declare var $: any;

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.css']
})
export class EditBranchComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;
  public branchDatalist: IBranch[] = [];
  public updatebranchSpecificData: FormGroup;
  public updateid: any;
  public term: any;
  public showEntries;
  public p = 1;
  public totalItems = [...this.branchDatalist];

  //  orderBy data
  public records = this.branchDatalist;
  public isDesc = false;
  public column;
  public direction: number;

  constructor(
    private branchService: BranchService,
    private fb: FormBuilder,
    private toaster: ToasterService
  ) {
    this.branchForm();
  }

  ngOnInit(): void {
    this.loadBranchdata();
  }

  public branchForm(): void {
    this.updatebranchSpecificData = this.fb.group({
      branchName: ['', [Validators.required]],
      branchCode: ['', [Validators.required]],
      branchAddress: ['', [Validators.required]],
      branchContactNumber: ['', [Validators.required,
                                Validators.pattern(CommonConstants.AllowOnlyNumberRegex),
                                Validators.maxLength(10),
                                Validators.minLength(10)]]
    });
  }

  get branchData() {
    return this.updatebranchSpecificData.controls;
  }

  /**
   * @ function : loadBranchdata
   * @ Purpose  : fetching the branchdata
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public loadBranchdata(): void {
    this.branchService.getBranchData().subscribe(res => {
      this.branchDatalist = res;
      this.showEntries = this.branchDatalist.length;
    });
  }


  public changeCount(event): void {
    this.showEntries = event.target.value;
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
   * @ function : editBranchdata
   * @ Purpose  : getBranchDataById & assigning to form fields
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public editBranchdata(data): void {
    this.branchService.getBranchById(data.id).subscribe(res => {
      this.updateid = data.id;
      this.updatebranchSpecificData.patchValue(res);
    });
  }

  /**
   * @ function : updateBranch
   * @ Purpose  : updating the branch data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public updateBranch(): void {
    this.branchService
      .updateBranchData(this.updateid, this.updatebranchSpecificData.value)
      .subscribe(res => {
        this.loadBranchdata();
        this.toaster.recordUpdated();
      });
    $(this.modal.nativeElement).click();
  }

  /**
   * @ function : deleteBranchdata
   * @ Purpose  : deleting the branch data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public deleteBranchdata(data): void {
    if (confirm('This branch deleted permanently')) {
      this.branchService.deleteBranch(data.id).subscribe(res => {
        this.loadBranchdata();
        this.toaster.recordDeleted();
      });
    }
  }
}

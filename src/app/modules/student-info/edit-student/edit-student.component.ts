import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from '../../../shared/dialogs/alerts/toaster.service';
import { IStudent } from '../../../entities/student.model';
import { StudentService } from '../../../services/student/student.service';
declare var $: any;

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;
  public StudentDatalist: IStudent[] = [];
  public updateStudentForm: FormGroup;
  public updateid: any;
  public sortedData: any;
  public term: any;

  //  orderBy data
  public records = this.sortedData;
  public isDesc = false;
  public column;
  public direction: number;

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder,
    private toaster: ToasterService
  ) {
    this.studentForm();
  }

  ngOnInit(): void {
    this.loadStudentdata();
  }

  public studentForm(): void {
    this.updateStudentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      qualification: ['', [Validators.required]],
      companyName: [''],
      Student: [null, [Validators.required]],
      joiningDate: [new Date(), [Validators.required]],
      courseType: ['course', [Validators.required]],
      courseName: ['', [Validators.required]],
      startingDate: [new Date(), [Validators.required]],
    });
  }

  get studentDate() {
    return this.updateStudentForm.controls;
  }

  /**
   * @ function : loadStudentdata
   * @ Purpose  : fetching the Studentdata
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public loadStudentdata(): void {
    this.studentService.getStudentData().subscribe(res => {
      this.StudentDatalist = res;
      this.sortedData = [...this.StudentDatalist];
    });
  }

  /**
   * @ function : sortData
   * @ Purpose  : sorting the Studentdata
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public sortData(event) {
    this.sortedData = [...this.StudentDatalist];
    if (event.target.value === 'all') {
      this.sortedData = [...this.StudentDatalist];
    }
    if (this.sortedData.length >= event.target.value) {
      return (this.sortedData.length = event.target.value);
    }
    return (this.sortedData = [...this.StudentDatalist]);
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
   * @ function : editStudentdata
   * @ Purpose  : getStudentDataById & assigning to form fields
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public editStudentdata(data): void {
    this.studentService.getStudentById(data.id).subscribe(res => {
      this.updateid = data.id;
      this.updateStudentForm.patchValue(res);
    });
  }

  /**
   * @ function : updateStudent
   * @ Purpose  : updating the Student data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public updateStudent(): void {
    this.studentService
      .updateStudentData(this.updateid, this.updateStudentForm.value)
      .subscribe(res => {
        this.loadStudentdata();
        this.toaster.recordUpdated();
      });
    $(this.modal.nativeElement).click();
  }

  /**
   * @ function : deleteStudentdata
   * @ Purpose  : deleting the Student data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public deleteStudentdata(data): void {
    if (confirm('This Student deleted permanently')) {
      this.studentService.deleteStudent(data.id).subscribe(res => {
        this.loadStudentdata();
        this.toaster.recordDeleted();
      });
    }
  }
}

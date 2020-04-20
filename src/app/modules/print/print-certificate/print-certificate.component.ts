import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StudentService } from '../../../services/student/student.service';
declare var $: any;

@Component({
  selector: 'app-print-certificate',
  templateUrl: './print-certificate.component.html',
  styleUrls: ['./print-certificate.component.css']
})
export class PrintCertificateComponent implements OnInit {
  @ViewChild('printsection')printsection: ElementRef;
  public certificate: FormGroup;
  public student;
  public studentname;
  public coursename;
  public startdate;
  public branch;
  constructor(private fb: FormBuilder, private studentService: StudentService) { }

  ngOnInit(): void {
    this.certificateForm();
  }

  public certificateForm(): void{
    this.certificate = this.fb.group({
      studentId: ['']
    });
  }

  get certificateData() {
    return this.certificate.controls;
  }


  public printCertificate(): void{
    window.print();
  }

  public bindingCertificateData(): void{
    this.studentname = this.student.firstName + ' ' + this.student.lastName;
    this.coursename = this.student.courseName.toString();
    this.startdate = new Date(this.student.startingDate).toLocaleDateString('en-GB');
    this.branch = this.student.branch;
   }

  public Submit(): void{
    this.studentService.getStudentById(this.certificate.get('studentId').value).subscribe((res) => {
      this.student = res;
      this.bindingCertificateData();
    });
  }

}

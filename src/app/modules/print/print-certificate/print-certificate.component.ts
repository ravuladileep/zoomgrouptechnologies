import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-print-certificate',
  templateUrl: './print-certificate.component.html',
  styleUrls: ['./print-certificate.component.css']
})
export class PrintCertificateComponent implements OnInit {
  public certificate: FormGroup;

  constructor(private fb: FormBuilder) { }

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

  public Submit(): void{
    console.log(this.certificate.value);
  }

}

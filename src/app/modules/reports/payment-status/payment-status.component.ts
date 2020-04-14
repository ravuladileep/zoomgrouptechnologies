import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {
  public paymentStatus: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.paymentStatusForm();
  }

  public paymentStatusForm(): void{
    this.paymentStatus = this.fb.group({
      studentId: ['']
    });
  }

  get studentData() {
    return this.paymentStatus.controls;
  }

  public Submit(): void{
    console.log(this.paymentStatus.value);
  }

}

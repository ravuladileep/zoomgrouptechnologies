import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-receipt-status',
  templateUrl: './receipt-status.component.html',
  styleUrls: ['./receipt-status.component.css']
})
export class ReceiptStatusComponent implements OnInit {
  public receiptStatus: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.receiptStatusForm();
  }

  public receiptStatusForm(): void{
    this.receiptStatus = this.fb.group({
      studentId: ['']
    });
  }

  get receiptData() {
    return this.receiptStatus.controls;
  }

  public Submit(): void{
    console.log(this.receiptStatus.value);
  }

}

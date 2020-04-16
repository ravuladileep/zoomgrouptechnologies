import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-print-receipt',
  templateUrl: './print-receipt.component.html',
  styleUrls: ['./print-receipt.component.css']
})
export class PrintReceiptComponent implements OnInit {
  public receipt: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.receiptForm();
  }

  public receiptForm(): void{
    this.receipt = this.fb.group({
      studentId: ['']
    });
  }

  get receiptData() {
    return this.receipt.controls;
  }

  public printReceipt(): void{
    window.print();
  }

  public Submit(): void{
    console.log(this.receipt.value);
  }

}

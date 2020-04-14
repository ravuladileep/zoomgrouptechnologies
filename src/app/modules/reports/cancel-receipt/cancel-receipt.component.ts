import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cancel-receipt',
  templateUrl: './cancel-receipt.component.html',
  styleUrls: ['./cancel-receipt.component.css']
})
export class CancelReceiptComponent implements OnInit {
  public cancelReceipt: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cancelReceiptForm();
  }

  public cancelReceiptForm(): void{
    this.cancelReceipt = this.fb.group({
      studentId: ['']
    });
  }

  get cancelReceiptData() {
    return this.cancelReceipt.controls;
  }

  public Submit(): void{
    console.log(this.cancelReceipt.value);
  }

}


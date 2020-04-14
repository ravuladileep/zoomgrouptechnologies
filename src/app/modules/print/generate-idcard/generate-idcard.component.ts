import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-generate-idcard',
  templateUrl: './generate-idcard.component.html',
  styleUrls: ['./generate-idcard.component.css']
})
export class GenerateIdcardComponent implements OnInit {
  public generateIdCard: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.generateIdCardForm();
  }

  public generateIdCardForm(): void{
    this.generateIdCard = this.fb.group({
      studentId: ['']
    });
  }

  get generateIdCardData() {
    return this.generateIdCard.controls;
  }

  public Submit(): void{
    console.log(this.generateIdCard.value);
  }

}

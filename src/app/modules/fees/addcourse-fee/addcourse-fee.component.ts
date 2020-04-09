import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebcamImage } from 'ngx-webcam';
import { ToasterService } from '../../../shared/dialogs/alerts/toaster.service';
import { FeeService } from '../../../services/fee/fee.service';

@Component({
  selector: 'app-addcourse-fee',
  templateUrl: './addcourse-fee.component.html',
  styleUrls: ['./addcourse-fee.component.css']
})
export class AddcourseFeeComponent implements OnInit {
  public studentIdData: FormGroup;
  public paymentSpecificData: FormGroup;
  public paymentPage = false;
  public mode = ['Cash', 'Credit/Debit Card', 'Cheque'];
  public webcamImage: WebcamImage = null;
  public studentPhotoUrl;
  public formdatafile: File;
  filename: any;

  constructor(private fb: FormBuilder, private feeService: FeeService, private toaster: ToasterService, private cd: ChangeDetectorRef) {
    this.studentIdForm();
    this.paymentForm();
  }
  ngOnInit(): void {}

  // web cam
    // latest snapshot

    handleImage(webcamImage: WebcamImage) {
      this.webcamImage = webcamImage;
    }



  public studentIdForm() {
    this.studentIdData = this.fb.group({
      studentId: ['', [Validators.required]],
    });
  }

  get studentData() {
    return this.studentIdData.controls;
  }

  public paymentForm() {
    this.paymentSpecificData = this.fb.group({
      studentPhoto: [''],
      relativePhoto: [''],
      studentIdProof: [''],
      paymentOptions: [''],
      mode: [null],
      cardNumber: [''],
      cardHolderName: [''],
      chequeNumber: [''],
      chequeBankName: [''],
      partFees: [''],
      remainingBalance: ['6962'],
      provideDiscount: ['']
    });
  }

  get paymentData() {
    return this.paymentSpecificData.controls;
  }

  /**
   * @ function : Submit()
   * @ Purpose  : submitting the form data
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public Submit(): void {
    this.paymentPage = true;
  }

  public studentImg(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.studentPhotoUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.formdatafile = (event.target as HTMLInputElement).files[0];
    this.filename = (event.target as HTMLInputElement).files[0].name;
  }

  public submitPayment() {
    const formdata: FormData = new FormData();
    formdata.append('studentPhoto', this.formdatafile, this.filename);
    console.log(formdata);
    this.feeService.addFee(this.paymentSpecificData.value).subscribe((res) => {
      console.log(res);
    });
  }
}

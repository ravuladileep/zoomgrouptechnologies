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

  constructor(private fb: FormBuilder, private feeService: FeeService, private toaster: ToasterService) {
  }
  ngOnInit(): void {
    this.studentIdForm();
    this.paymentForm();
    this.setPaymentModeValidators();
    this.setPaymentOptionsValidators();
  }

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
      paymentOptions: ['', [Validators.required]],
      mode: [null, [Validators.required]],
      cardNumber: ['', [Validators.required]],
      cardHolderName: ['', [Validators.required]],
      chequeNumber: ['', [Validators.required]],
      chequeBankName: ['', [Validators.required]],
      partFees: ['', [Validators.required]],
      remainingBalance: ['6962', [Validators.required]],
      provideDiscount: ['', [Validators.required]]
    });
  }

  /**
   * @ function : setPaymentModeValidators
   * @ Purpose  : setting the validators based on the user Select Payment Mode
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public setPaymentModeValidators(): void {
    const cardNumberControl = this.paymentSpecificData.get('cardNumber');
    const cardHolderNameControl = this.paymentSpecificData.get('cardHolderName');
    const chequeNumberControl = this.paymentSpecificData.get('chequeNumber');
    const chequeBankNameControl = this.paymentSpecificData.get('chequeBankName');

    this.paymentSpecificData.get('mode').valueChanges.subscribe((val) => {

        if (val === 'Credit/Debit Card') {
          cardNumberControl.setValidators([Validators.required]);
          cardHolderNameControl.setValidators([Validators.required]);
          chequeNumberControl.setValidators(null);
          chequeBankNameControl.setValidators(null);
        }

        if (val === 'Cheque') {
          cardNumberControl.setValidators(null);
          cardHolderNameControl.setValidators(null);
          chequeNumberControl.setValidators([Validators.required]);
          chequeBankNameControl.setValidators([Validators.required]);
        }


        if (val === 'Cash') {
          cardNumberControl.setValidators(null);
          cardHolderNameControl.setValidators(null);
          chequeNumberControl.setValidators(null);
          chequeBankNameControl.setValidators(null);
        }

        cardNumberControl.updateValueAndValidity();
        cardHolderNameControl.updateValueAndValidity();
        chequeNumberControl.updateValueAndValidity();
        chequeBankNameControl.updateValueAndValidity();

    });
  }

  /**
   * @ function : setPaymentOptionsValidators
   * @ Purpose  : setting the validators based on the user Select Payment Options
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */

  public setPaymentOptionsValidators(): void {
    const partFeesControl = this.paymentSpecificData.get('partFees');
    this.paymentSpecificData.get('paymentOptions').valueChanges.subscribe((val) => {

      if (val === 'part') {
        partFeesControl.setValidators([Validators.required]);
      }
      if (val === 'full') {
        partFeesControl.setValidators(null);
      }
      partFeesControl.updateValueAndValidity();
    });
  }

  get paymentData() {
    return this.paymentSpecificData.controls;
  }

  /**
   * @ function : Submit()
   * @ Purpose  : submitting the studentId
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
    // const formdata: FormData = new FormData();
    // formdata.append('studentPhoto', this.formdatafile, this.filename);
    // console.log(formdata);
    // this.feeService.addFee(this.paymentSpecificData.value).subscribe((res) => {
    //   console.log(res);
    // });
  }
}

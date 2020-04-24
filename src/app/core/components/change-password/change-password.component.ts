import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from '../../../shared/directives/must-match.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public changePassword: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.changePasswordForm();
  }

  public changePasswordForm(): void {
    this.changePassword = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {validator: MustMatch('newPassword', 'confirmPassword')});
  }



  get passwordData() {
    return this.changePassword.controls;
  }

  public submit(): void{
    console.log(this.changePassword.value);
  }

}

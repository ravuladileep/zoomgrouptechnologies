import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from '../../../shared/dialogs/alerts/toaster.service';
import { CommonConstants } from '../../../config/constants';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private toaster: ToasterService) {
    this.userLoginForm();
  }

  ngOnInit(): void {}

  public userLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(CommonConstants.EmailRegex)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get loginData() {
    return this.loginForm.controls;
  }

  public onSubmit(): void {
    CommonConstants.setToken('dummy token');
    this.router.navigate(['dashboard']);
    this.toaster.loginSuccess();
  }
}

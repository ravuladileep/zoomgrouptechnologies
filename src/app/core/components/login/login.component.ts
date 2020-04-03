import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonConstants } from 'src/app/config/constants';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/dialogs/alerts/toaster.service';

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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
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

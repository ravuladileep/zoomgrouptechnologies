import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { CommonConstants } from 'src/app/config/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthChildGuard implements CanActivateChild {
  constructor(private router: Router) {}
  canActivateChild(): boolean {
    if (CommonConstants.getToken()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}

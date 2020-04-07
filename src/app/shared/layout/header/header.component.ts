import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from '../../dialogs/alerts/toaster.service';
import { CommonConstants } from '../../../config/constants';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private toaster: ToasterService) { }

  ngOnInit(): void {
  }

  public logOut(): void {
    CommonConstants.removeToken();
    this.router.navigate(['login']);
    this.toaster.logOutSuccess();
  }

}

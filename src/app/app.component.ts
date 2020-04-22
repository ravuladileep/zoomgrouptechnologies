import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {  Event, Router, NavigationError, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'zoomtechnologies';
  constructor(private spinner: NgxSpinnerService, private router: Router) {
    this.spinnerforNavigatingRoutes();
  }
  ngOnInit(): void{
  }
  /**
   * @ function : spinnerforNavigatingRoutes
   * @ Purpose  : showing spinner while navigating one route to another route
   * @ version  : 1.0.1
   * @ author   : dileep_ravula
   */
  public spinnerforNavigatingRoutes(): void{
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.spinner.show();
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.spinner.hide();
          break;
        }
        default: {
          break;
        }
      }
    });
  }

}


import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) { }
  public loginSuccess() {
    this.toastr.success('you\'ve successfully loggedin', 'Success');
  }

  public recordAdded() {
    this.toastr.success('record added successfully ', 'Success');
  }

  public recordDeleted() {
    this.toastr.info('record deleted successfully ', 'Info');
  }

  public recordUpdated() {
    this.toastr.success('record updated successfully ', 'Success');
  }

  public logOutSuccess() {
    this.toastr.success('you\'ve successfully loggedOut', 'Success');
  }

}

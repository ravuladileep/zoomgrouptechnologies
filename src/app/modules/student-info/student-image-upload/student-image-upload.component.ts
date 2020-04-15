import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-image-upload',
  templateUrl: './student-image-upload.component.html',
  styleUrls: ['./student-image-upload.component.css'],
})
export class StudentImageUploadComponent implements OnInit {
  public isSubmit = false;
  constructor() {}

  ngOnInit(): void {}

  public print(): void {
    window.print();
  }

  public submit(): void {
    this.isSubmit = true;
  }
}

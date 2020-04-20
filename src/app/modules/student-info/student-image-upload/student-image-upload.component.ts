import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StudentService } from '../../../services/student/student.service';

@Component({
  selector: 'app-student-image-upload',
  templateUrl: './student-image-upload.component.html',
  styleUrls: ['./student-image-upload.component.css'],
})
export class StudentImageUploadComponent implements OnInit {
  @ViewChild('studentId')studentId: ElementRef;
  public student;
  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
  }

  public print(): void {
    window.print();
  }

  public submit(): void {
    this.studentService.getStudentById(this.studentId.nativeElement.value).subscribe(res => {
      this.student = res;
    });
  }
}

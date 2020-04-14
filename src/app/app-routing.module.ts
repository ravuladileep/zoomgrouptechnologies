import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { CourseSpecificReportComponent } from './modules/course-specific/course-specific-report/course-specific-report.component';
import { AddBranchComponent } from './modules/branch/add-branch/add-branch.component';
import { EditBranchComponent } from './modules/branch/edit-branch/edit-branch.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AddCourseComponent } from './modules/course/add-course/add-course.component';
import { EditCourseComponent } from './modules/course/edit-course/edit-course.component';
import { AuthChildGuard } from './core/guards/auth-child.guard';
import { AddcourseFeeComponent } from './modules/fees/addcourse-fee/addcourse-fee.component';
import { EditcourseFeeComponent } from './modules/fees/editcourse-fee/editcourse-fee.component';
import { AddcoursePackageComponent } from './modules/course-package/addcourse-package/addcourse-package.component';
import { EditcoursePackageComponent } from './modules/course-package/editcourse-package/editcourse-package.component';
import { AddcourseScheduleComponent } from './modules/schedule/addcourse-schedule/addcourse-schedule.component';
import { EditcourseScheduleComponent } from './modules/schedule/editcourse-schedule/editcourse-schedule.component';
import { AddEmployeeComponent } from './modules/user/add-employee/add-employee.component';
import { EditEmployeeComponent } from './modules/user/edit-employee/edit-employee.component';
import { AddRoleComponent } from './modules/role/add-role/add-role.component';
import { EditRoleComponent } from './modules/role/edit-role/edit-role.component';
import { AddStudentComponent } from './modules/student-info/add-student/add-student.component';
import { EditStudentComponent } from './modules/student-info/edit-student/edit-student.component';
import { SearchStudentComponent } from './modules/student-info/search-student/search-student.component';
import { StudentImageUploadComponent } from './modules/student-info/student-image-upload/student-image-upload.component';
import { CounsellorReportComponent } from './modules/reports/counsellor-report/counsellor-report.component';
import { TotalAdmissionReportComponent } from './modules/reports/total-admission-report/total-admission-report.component';
import { PaymentReportComponent } from './modules/reports/payment-report/payment-report.component';
import { PaymentStatusComponent } from './modules/reports/payment-status/payment-status.component';
import { StudentNotEnrolledReportComponent } from './modules/reports/student-not-enrolled-report/student-not-enrolled-report.component';
import { StudentEnrolledReportComponent } from './modules/reports/student-enrolled-report/student-enrolled-report.component';
import { AccountantReportComponent } from './modules/reports/accountant-report/accountant-report.component';
import { ReceiptStatusComponent } from './modules/reports/receipt-status/receipt-status.component';
import { CancelReceiptComponent } from './modules/reports/cancel-receipt/cancel-receipt.component';
import { PrintCertificateComponent } from './modules/print/print-certificate/print-certificate.component';
import { PrintReceiptComponent } from './modules/print/print-receipt/print-receipt.component';
import { GenerateIdcardComponent } from './modules/print/generate-idcard/generate-idcard.component';
import { AttendanceSheetComponent } from './modules/print/attendance-sheet/attendance-sheet.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent, canActivateChild: [AuthChildGuard],
    children: [
      { path: '', redirectTo: 'configure_access', pathMatch: 'full' },
      { path: 'configure_access', component: CourseSpecificReportComponent },
      { path: 'add_branch', component: AddBranchComponent },
      { path: 'edit_branch', component: EditBranchComponent },
      { path: 'add_course', component: AddCourseComponent },
      { path: 'edit_course', component: EditCourseComponent },
      { path: 'add_fees', component: AddcourseFeeComponent},
      { path: 'edit_fees', component: EditcourseFeeComponent},
      { path: 'add_course_package', component: AddcoursePackageComponent},
      { path: 'edit_course_package', component: EditcoursePackageComponent},
      { path: 'add_schedule', component: AddcourseScheduleComponent},
      { path: 'edit_schedule', component: EditcourseScheduleComponent},
      { path: 'add_user', component: AddEmployeeComponent},
      { path: 'edit_user', component: EditEmployeeComponent},
      { path: 'add_role', component: AddRoleComponent},
      { path: 'edit_role', component: EditRoleComponent},
      { path: 'add_student_details', component: AddStudentComponent},
      { path: 'edit_student_details', component: EditStudentComponent},
      { path: 'search_student', component: SearchStudentComponent},
      { path: 'image_upload', component: StudentImageUploadComponent},
      { path: 'counsellor_report', component: CounsellorReportComponent},
      { path: 'total_admission_report', component: TotalAdmissionReportComponent},
      { path: 'payment_report', component: PaymentReportComponent},
      { path: 'payment_status', component: PaymentStatusComponent},
      { path: 'student_not_enrolled_report', component: StudentNotEnrolledReportComponent},
      { path: 'accountant_report', component: AccountantReportComponent},
      { path: 'receipt_status', component: ReceiptStatusComponent},
      { path: 'student_enrolled_report', component: StudentEnrolledReportComponent},
      { path: 'cancel_receipt', component: CancelReceiptComponent},
      { path: 'print_certificate', component: PrintCertificateComponent},
      { path: 'print_receipt', component: PrintReceiptComponent},
      { path: 'generate_idcard', component: GenerateIdcardComponent},
      { path: 'attendance_sheet', component: AttendanceSheetComponent}
    ]
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

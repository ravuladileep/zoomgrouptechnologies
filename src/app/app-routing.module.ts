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
      { path: 'image_upload', component: StudentImageUploadComponent}

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

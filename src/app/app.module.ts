import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { NavbarComponent } from './shared/layout/navbar/navbar.component';
import { LoginComponent } from './core/components/login/login.component';
import { AddBranchComponent } from './modules/branch/add-branch/add-branch.component';
import { EditBranchComponent } from './modules/branch/edit-branch/edit-branch.component';
import { CourseSpecificReportComponent } from './modules/course-specific/course-specific-report/course-specific-report.component';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BranchService } from './services/branch/branch.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddCourseComponent } from './modules/course/add-course/add-course.component';
import { EditCourseComponent } from './modules/course/edit-course/edit-course.component';
import { CourseService } from './services/course/course.service';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthChildGuard } from './core/guards/auth-child.guard';
import { MyInterceptor } from './core/interceptors/my-interceptor';
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
import { OrderByPipe } from './shared/pipes/order-by.pipe';
import { ToasterService } from './shared/dialogs/alerts/toaster.service';
import { ToastrModule } from 'ngx-toastr';
import { UserService } from './services/user/user.service';
import { WebcamModule } from 'ngx-webcam';
import { CameraComponent } from './shared/modules/camera/camera.component';
import { CoursePackageService } from './services/course-package/course-package.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ScheduleService } from './services/schedule/schedule.service';
import {NgxPaginationModule} from 'ngx-pagination';
// import { PaginationModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HeaderComponent,
    NavbarComponent,
    LoginComponent,
    AddBranchComponent,
    EditBranchComponent,
    CourseSpecificReportComponent,
    DashboardComponent,
    AddCourseComponent,
    EditCourseComponent,
    AddcourseFeeComponent,
    EditcourseFeeComponent,
    AddcoursePackageComponent,
    EditcoursePackageComponent,
    AddcourseScheduleComponent,
    EditcourseScheduleComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    AddRoleComponent,
    EditRoleComponent,
    AddStudentComponent,
    EditStudentComponent,
    SearchStudentComponent,
    StudentImageUploadComponent,
    OrderByPipe,
    CameraComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot({
      timeOut: 3500
    }),
    WebcamModule,
    BsDatepickerModule.forRoot(),
    NgxPaginationModule
    // PaginationModule.forRoot()
  ],
  providers: [
    BranchService,
    CourseService,
    AuthGuard,
    AuthChildGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true
    },
    ToasterService,
    UserService,
    CoursePackageService,
    ScheduleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

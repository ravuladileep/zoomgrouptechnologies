import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ICoursePackage } from '../../entities/course-package.model';

@Injectable({
  providedIn: 'root',
})
export class CoursePackageService {
  public coursePackageUrl = 'http://localhost:3000/course-package/';

  constructor(private http: HttpClient) {}

  public addCoursePackage(data): Observable<ICoursePackage> {
    return this.http
      .post<ICoursePackage>(this.coursePackageUrl, data)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public getCourseDataPackage(): Observable<ICoursePackage[]> {
    return this.http
      .get<ICoursePackage[]>(this.coursePackageUrl)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public updateCoursePackageData(id, data): Observable<ICoursePackage> {
    return this.http
      .patch<ICoursePackage>(this.coursePackageUrl + id, data)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public deleteCoursePackage(id): Observable<ICoursePackage> {
    return this.http
      .delete<ICoursePackage>(this.coursePackageUrl + id)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public getCoursePackageById(id): Observable<ICoursePackage> {
    return this.http
      .get<ICoursePackage>(this.coursePackageUrl + id)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}

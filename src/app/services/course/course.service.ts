import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ICourse } from '../../entities/course.model';
import { CommonConstants } from '../../config/constants';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  public courseUrl = 'http://localhost:3000/course/';

  constructor(private http: HttpClient) {}

  public addCourse(data): Observable<ICourse> {
    return this.http
      .post<ICourse>(this.courseUrl, data)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public getCourseData(): Observable<ICourse[]> {
    return this.http
      .get<ICourse[]>(this.courseUrl)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public updateCourseData(id, data): Observable<ICourse> {
    return this.http
      .patch<ICourse>(this.courseUrl + id, data)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public deleteCourse(id): Observable<ICourse> {
    return this.http
      .delete<ICourse>(this.courseUrl + id)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public getCourseById(id): Observable<ICourse> {
    return this.http
      .get<ICourse>(this.courseUrl + id)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

}

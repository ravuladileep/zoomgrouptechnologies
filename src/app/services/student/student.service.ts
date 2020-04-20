import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { IStudent } from '../../entities/student.model';
import { CommonConstants } from '../../config/constants';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  public studentUrl = 'http://localhost:3000/student/';

  constructor(private http: HttpClient) {}

  public addStudent(data): Observable<IStudent> {
    return this.http
      .post<IStudent>(this.studentUrl, data)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public getStudentData(): Observable<IStudent[]> {
    return this.http
      .get<IStudent[]>(this.studentUrl)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public updateStudentData(id, data): Observable<IStudent> {
    return this.http
      .patch<IStudent>(this.studentUrl + id, data)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public deleteStudent(id): Observable<IStudent> {
    return this.http
      .delete<IStudent>(this.studentUrl + id)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public getStudentById(id): Observable<IStudent> {
    return this.http
      .get<IStudent>(this.studentUrl + id)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public getStudentBySearch(key, value): Observable<IStudent> {
    // let myparams = new HttpParams();
    // myparams = myparams.append(key, value);
    const myparams = new HttpParams({fromString: `${key}=${value}`});
    return this.http
      .get<IStudent>(this.studentUrl, {params: myparams})
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

}

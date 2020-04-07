import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { IStudent } from '../../entities/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  public studentUrl = 'http://localhost:3000/student/';

  constructor(private http: HttpClient) {}

  public addStudent(data): Observable<IStudent> {
    return this.http
      .post<IStudent>(this.studentUrl, data)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public getStudentData(): Observable<IStudent[]> {
    return this.http
      .get<IStudent[]>(this.studentUrl)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public updateStudentData(id, data): Observable<IStudent> {
    return this.http
      .patch<IStudent>(this.studentUrl + id, data)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public deleteStudent(id): Observable<IStudent> {
    return this.http
      .delete<IStudent>(this.studentUrl + id)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public getStudentById(id): Observable<IStudent> {
    return this.http
      .get<IStudent>(this.studentUrl + id)
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

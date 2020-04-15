import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ISchedule } from '../../entities/schedule.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  public ScheduleUrl = 'http://localhost:3000/schedule/';

  constructor(private http: HttpClient) {}

  public addSchedule(data): Observable<ISchedule> {
    return this.http
      .post<ISchedule>(this.ScheduleUrl, data)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public getScheduleData(): Observable<ISchedule[]> {
    return this.http
      .get<ISchedule[]>(this.ScheduleUrl)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public updateScheduleData(id, data): Observable<ISchedule> {
    return this.http
      .patch<ISchedule>(this.ScheduleUrl + id, data)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public deleteSchedule(id): Observable<ISchedule> {
    return this.http
      .delete<ISchedule>(this.ScheduleUrl + id)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public getScheduleById(id): Observable<ISchedule> {
    return this.http
      .get<ISchedule>(this.ScheduleUrl + id)
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

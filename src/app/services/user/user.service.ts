import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Iuser } from '../../entities/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userUrl = 'http://localhost:3000/user/';

  constructor(private http: HttpClient) {}

  public adduser(data): Observable<Iuser> {
    return this.http
      .post<Iuser>(this.userUrl, data)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public getuserData(): Observable<Iuser[]> {
    return this.http
      .get<Iuser[]>(this.userUrl)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public updateuserData(id, data): Observable<Iuser> {
    return this.http
      .patch<Iuser>(this.userUrl + id, data)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public deleteuser(id): Observable<Iuser> {
    return this.http
      .delete<Iuser>(this.userUrl + id)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public getuserById(id): Observable<Iuser> {
    return this.http
      .get<Iuser>(this.userUrl + id)
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

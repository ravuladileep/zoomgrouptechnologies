import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Iuser } from '../../entities/user.model';
import { CommonConstants } from '../../config/constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userUrl = 'http://localhost:3000/user/';

  constructor(private http: HttpClient) {}

  public adduser(data): Observable<Iuser> {
    return this.http
      .post<Iuser>(this.userUrl, data)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public getuserData(): Observable<Iuser[]> {
    return this.http
      .get<Iuser[]>(this.userUrl)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public updateuserData(id, data): Observable<Iuser> {
    return this.http
      .patch<Iuser>(this.userUrl + id, data)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public deleteuser(id): Observable<Iuser> {
    return this.http
      .delete<Iuser>(this.userUrl + id)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public getuserById(id): Observable<Iuser> {
    return this.http
      .get<Iuser>(this.userUrl + id)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

}

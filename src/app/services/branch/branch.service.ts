import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { IBranch } from '../../entities/branch.model';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  public branchUrl = 'http://localhost:3000/branch/';

  constructor(private http: HttpClient) {}

  public addBranch(data): Observable<IBranch> {
    return this.http
      .post<IBranch>(this.branchUrl, data)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public getBranchData(): Observable<IBranch[]> {
    return this.http
      .get<IBranch[]>(this.branchUrl)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public updateBranchData(id, data): Observable<IBranch> {
    return this.http
      .patch<IBranch>(this.branchUrl + id, data)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public deleteBranch(id): Observable<IBranch> {
    return this.http
      .delete<IBranch>(this.branchUrl + id)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public getBranchById(id): Observable<IBranch> {
    return this.http
      .get<IBranch>(this.branchUrl + id)
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

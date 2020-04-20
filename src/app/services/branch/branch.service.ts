import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { IBranch } from '../../entities/branch.model';
import { CommonConstants } from '../../config/constants';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  public branchUrl = 'http://localhost:3000/branch/';

  constructor(private http: HttpClient) {}

  public addBranch(data): Observable<IBranch> {
    return this.http
      .post<IBranch>(this.branchUrl, data)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public getBranchData(): Observable<IBranch[]> {
    return this.http
      .get<IBranch[]>(this.branchUrl)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public updateBranchData(id, data): Observable<IBranch> {
    return this.http
      .patch<IBranch>(this.branchUrl + id, data)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public deleteBranch(id): Observable<IBranch> {
    return this.http
      .delete<IBranch>(this.branchUrl + id)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public getBranchById(id): Observable<IBranch> {
    return this.http
      .get<IBranch>(this.branchUrl + id)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

}

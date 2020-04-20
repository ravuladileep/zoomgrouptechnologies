import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { IFee } from '../../entities/fee.model';
import { CommonConstants } from '../../config/constants';

@Injectable({
  providedIn: 'root',
})
export class FeeService {
  public feeUrl = 'http://localhost:3000/fee/';

  constructor(private http: HttpClient) {}

  public addFee(data): Observable<IFee> {
    return this.http
      .post<IFee>(this.feeUrl, data)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public getFeeData(): Observable<IFee[]> {
    return this.http
      .get<IFee[]>(this.feeUrl)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public updateFeeData(id, data): Observable<IFee> {
    return this.http
      .patch<IFee>(this.feeUrl + id, data)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public deleteFee(id): Observable<IFee> {
    return this.http
      .delete<IFee>(this.feeUrl + id)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public getFeeById(id): Observable<IFee> {
    return this.http
      .get<IFee>(this.feeUrl + id)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

}

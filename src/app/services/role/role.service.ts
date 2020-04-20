import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { IRole } from '../../entities/role.model';
import { CommonConstants } from '../../config/constants';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  public roleUrl = 'http://localhost:3000/role/';

  constructor(private http: HttpClient) {}

  public addRole(data): Observable<IRole> {
    return this.http
      .post<IRole>(this.roleUrl, data)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public getRoleData(): Observable<IRole[]> {
    return this.http
      .get<IRole[]>(this.roleUrl)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public updateRoleData(id, data): Observable<IRole> {
    return this.http
      .patch<IRole>(this.roleUrl + id, data)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public deleteRole(id): Observable<IRole> {
    return this.http
      .delete<IRole>(this.roleUrl + id)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

  public getRoleById(id): Observable<IRole> {
    return this.http
      .get<IRole>(this.roleUrl + id)
      .pipe(retry(1), catchError(CommonConstants.errorHandler));
  }

}

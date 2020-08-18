import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ResponseApi } from '../../../shared/models/response-api';
import { LogIn } from '../models/log-in';

@Injectable({
  providedIn: 'root'
})
export class LogInService {
  constructor(
    private httpClient: HttpClient
  ) { }

  logIn(formLogIn: { email: string, password: string }): Observable<LogIn> {
    return this.httpClient.post<LogIn>(`${ environment.apiUrl }/auth/log-in`, formLogIn, {
      observe: 'response',
      responseType: 'json'
    }).pipe(
      pluck('body')
    );
  }

  saveTokenAuth(token: string) {
    sessionStorage.setItem('token', token);
  }

  getTokenAuth(): string {
    return sessionStorage.getItem('token');
  }

  getUserAuthenticated(token: string): Observable<any> {
    return this.httpClient.get(`${ environment.apiUrl }/auth/${ token }`, {
      observe: 'response',
      responseType: 'json'
    }).pipe(pluck('body'));
  }

  logout(): Observable<ResponseApi> {
    return this.httpClient.get<ResponseApi>(`${environment.apiUrl}/auth/logout`, {
      observe: 'response'
    }).pipe(pluck('body'));
  }

}

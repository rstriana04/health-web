import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ResponseApi } from '../../../shared/models/response-api';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(
    private httpClient: HttpClient
  ) { }

  signUp(user: User): Observable<ResponseApi> {
    return this.httpClient.post<ResponseApi>(`${ environment.apiUrl }/auth/sign-up`, user, {
      observe: 'response',
      responseType: 'json'
    }).pipe(
      pluck('body')
    );
  }

}

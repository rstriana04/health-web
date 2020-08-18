import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LogInService } from '../../services/log-in.service';
import { GetUserAuthenticatedFailedAction, GetUserAuthenticatedSuccessAction, LogInActionsTypes } from '../actions/log-in.actions';

@Injectable()
export class GetUserAuthenticated {
  GetAuthUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LogInActionsTypes.GET_USER_AUTHENTICATED),
      mergeMap((action: any) => {
          return this.loginService.getUserAuthenticated(action.token).pipe(
            map(user => {
              this.loginService.saveTokenAuth(user.accessToken);
              return GetUserAuthenticatedSuccessAction(
                { user });
            }),
            catchError((httpErrorResponse: HttpErrorResponse) => {
              console.error(httpErrorResponse);
              return of(GetUserAuthenticatedFailedAction({ message: 'Error get user authenticated' }));
            })
          );
        }
      )
    )
  );

  constructor(
    private actions$: Actions,
    private loginService: LogInService
  ) {}
}

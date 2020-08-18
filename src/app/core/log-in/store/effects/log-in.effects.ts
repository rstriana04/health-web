import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AppState } from '../../../../store/reducers/app.reducer';
import { LogInService } from '../../services/log-in.service';
import { AuthUserFailedAction, AuthUserSuccessAction, LogInActionsTypes } from '../actions/log-in.actions';

@Injectable()
export class LogInEffects {
  AuthUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LogInActionsTypes.SET_AUTH_USER),
      mergeMap((action: any) =>
        this.logInService.logIn(action.credentials).pipe(
          map(response => {
            this.logInService.saveTokenAuth(response.accessToken);
            this.router.navigate(['/home']);
            return AuthUserSuccessAction({ credentials: response });
          }),
          catchError((httpErrorResponse: HttpErrorResponse) => {
            return of(
              AuthUserFailedAction({ message: httpErrorResponse.error.message }
              ));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private logInService: LogInService,
    private store: Store<AppState>,
    private router: Router
  ) {}

}

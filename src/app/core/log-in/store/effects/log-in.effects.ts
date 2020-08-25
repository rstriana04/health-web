import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Toast, ToastrService } from 'ngx-toastr';
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
            if ( httpErrorResponse.error.status === 403 ) {
              this.toastService.error('¡Bad Credentials, please verify!', '¡Oops, error!', {
                closeButton: true,
                progressAnimation: 'decreasing',
                timeOut: 9000,
                progressBar: true
              });
            } else {
              this.toastService.error('¡Error login!', '¡Oops, error!', {
                closeButton: true,
                progressAnimation: 'decreasing',
                timeOut: 9000,
                progressBar: true
              });
            }
            return of(
              AuthUserFailedAction({ message: { message: httpErrorResponse.error.message, status: httpErrorResponse.error.status } }
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
    private router: Router,
    private toastService: ToastrService
  ) {}

}

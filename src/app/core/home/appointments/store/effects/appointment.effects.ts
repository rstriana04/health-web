import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AppState } from '../../../../../store/reducers/app.reducer';
import { AppointmentsService } from '../../services/appointments.service';
import { FailedAttemptGetAllAppointmentsAction, SuccessAttemptGetAllAppointmentsAction } from '../actions/appointments.actions';

@Injectable()
export class AppointmentEffects {
  appointment$ = createEffect(() => this.actions.pipe(
    ofType('[Appointments] Attempt Get All Appointments'),
    mergeMap(() => {
      return this.appointmentService.getAllAppointmentsFromRequest().pipe(
        map(appointments => {
          return SuccessAttemptGetAllAppointmentsAction({ appointments });
        }),
        catchError((httpErrorResponse: HttpErrorResponse) => {
          return of(FailedAttemptGetAllAppointmentsAction({ message: '[Appointments] Failed Attempt Get All Appointments' }));
        })
      );
    })
  ));

  constructor(
    private actions: Actions,
    private appointmentService: AppointmentsService,
    private store: Store<AppState>
  ) {
  }

}

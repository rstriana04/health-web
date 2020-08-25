import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AppState } from '../../../../store/reducers/app.reducer';
import { AppointmentsService } from '../../../home/appointments/services/appointments.service';
import { StaffScheduleService } from '../../services/staff-schedule.service';
import { FailedAttemptLoadStaffSchedules, SuccessAttemptLoadStaffSchedules } from '../actions/staff-schedules.actions';

@Injectable()
export class StaffSchedulesEffects {
  staffSchedules$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Staff Schedule] Attempt Load Staff Schedules'),
      mergeMap(() => {
        return this.staffScheduleService.getScheduleByStaff().pipe(
          map(schedules => {
            return SuccessAttemptLoadStaffSchedules({ schedules });
          }),
          catchError((httpErrorResponse: HttpErrorResponse) => {
            console.error(httpErrorResponse);
            return of(FailedAttemptLoadStaffSchedules({ message: 'Failed Attempt Load Staff Schedules' }));
          })
        );
      })
    ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private staffScheduleService: StaffScheduleService,
    private appointmentService: AppointmentsService
  ) {}
}

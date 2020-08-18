import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AppState } from '../../../../store/reducers/app.reducer';
import { PatientService } from '../../services/patient.service';
import { FailedAttemptLoadAllPatients, SuccessfulAttemptLoadAllPatients } from '../actions/patient.actions';

@Injectable()
export class PatientEffects {
  schedules$ = createEffect(() => this.actions$.pipe(
    ofType('[Patients] Attempt Load All Patients'),
    mergeMap(() => {
      return this.patientService.getPatientsByStaffFromRequest().pipe(
        map(patients => {
          return SuccessfulAttemptLoadAllPatients({ patients });
        }),
        catchError((httpErrorResponse: HttpErrorResponse) => {
          console.error(httpErrorResponse);
          return of(FailedAttemptLoadAllPatients({ message: '[Patients] Failed attempt Load All Patients' }));
        })
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private patientService: PatientService
  ) {}

}

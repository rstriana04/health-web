import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, pluck, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AppState } from '../../../store/reducers/app.reducer';
import { selectUserAuthenticated } from '../../log-in/store/selectors/log-in.selectors';
import { Patient } from '../models/patient';
import { AddPatient } from '../store/actions/patient.actions';
import { selectAllPatientsByStaff, selectStatePatient } from '../store/selectors/patient.selectors';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) { }

  getPatientsByStaffFromStore(): Observable<Patient[]> {
    return this.store.pipe(
      select(selectUserAuthenticated),
      filter(user => !!user),
      switchMap(user => this.store.pipe(
        select(selectStatePatient),
        select(selectAllPatientsByStaff, { user: user.id })
      ))
    );
  }

  getPatientsByStaffFromRequest(): Observable<Patient[]> {
    return this.store.pipe(
      select(selectUserAuthenticated),
      filter(user => !!user),
      switchMap(user =>
        this.httpClient.get<Patient[]>(`${ environment.apiUrl }/${ environment.apiPrefix }/patients/${ user.id }`, {
          observe: 'response',
          responseType: 'json'
        }).pipe(
          pluck('body')
        ))
    );
  }

  createPatient(form: Patient): Observable<Patient> {
    return this.store.pipe(
      select(selectUserAuthenticated),
      filter(user => !!user),
      map(user => {
        return {
          ...form,
          user
        };
      }),
      switchMap(patient => this.httpClient.post<Patient>(`${ environment.apiUrl }/${ environment.apiPrefix }/patients`, patient, {
        observe: 'response',
        responseType: 'json'
      }).pipe(
        pluck('body'),
        tap(patientStore => this.store.dispatch(AddPatient({ patient: patientStore })))
      ))
    );

  }

  updatePatient(patient: Patient): Observable<Patient> {
    return this.httpClient.put<Patient>(`${ environment.apiUrl }/${ environment.apiPrefix }/patients`, patient, {
      observe: 'response',
      responseType: 'json'
    }).pipe(pluck('body'), tap(() => this.store.dispatch(AddPatient({ patient }))));
  }

  deletePatient(patientId: number): Observable<any> {
    return this.httpClient.delete(`${ environment.apiUrl }/${ environment.apiPrefix }/patients/${ patientId }`, {
      observe: 'response',
      responseType: 'json'
    }).pipe(
      pluck('body')
    );
  }

}

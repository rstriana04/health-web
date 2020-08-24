import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/internal-compatibility';
import { filter, first, pluck, switchMap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { AppState } from '../../../../store/reducers/app.reducer';
import { selectUserAuthenticated } from '../../../log-in/store/selectors/log-in.selectors';
import { Appointment } from '../models/appointment';
import { selectAllAppointmentByUserId, selectAppointmentState } from '../store/selectors/appointment.selectors';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  socket$: WebSocketSubject<string>;

  constructor(
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) {
  }

  createConnectionSocket() {
    console.log('Create Connection Socket');
    this.socket$ = new WebSocketSubject<string>(`${ environment.webSocketEndPoint }/appointments`);
  }

  setAppointment(appointment: string) {
    this.socket$.next(appointment);
  }

  getAppointments(): Observable<string> {
    return this.socket$;
  }

  closeConnectionWithSocket(): void {
    return this.socket$.complete();
  }

  getAllAppointmentsFromRequest(): Observable<Appointment[]> {
    return this.store.pipe(
      select(selectUserAuthenticated),
      filter(user => !!user),
      first(),
      switchMap(
        user => this.httpClient.get<Appointment[]>(`${ environment.apiUrl }/${ environment.apiPrefix }/appointments/staff/${ user.id }`, {
          observe: 'response',
          responseType: 'json'
        }).pipe(pluck('body'))
      )
    );
  }

  getAllAppointmentsFromStore(): Observable<Appointment[]> {
    return this.store.pipe(
      select(selectUserAuthenticated),
      filter(user => !!user),
      first(),
      switchMap(user => this.store.pipe(
        select(selectAppointmentState),
        select(selectAllAppointmentByUserId, { userId: user.id })
      ))
    );
  }

}

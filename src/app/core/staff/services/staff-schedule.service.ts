import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, pluck, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AppState } from '../../../store/reducers/app.reducer';
import { AppointmentsService } from '../../home/appointments/services/appointments.service';
import { selectUserAuthenticated } from '../../log-in/store/selectors/log-in.selectors';
import { StaffSchedule } from '../models/staff-schedule';
import { AddSchedulesAction } from '../store/actions/staff-schedules.actions';
import { selectAllSchedules, selectStateStaffSchedules } from '../store/selectors/staff-schedules.selectors';

@Injectable({
  providedIn: 'root'
})
export class StaffScheduleService {

  constructor(
    private httpClient: HttpClient,
    private store: Store<AppState>,
    private appointmentService: AppointmentsService
  ) { }

  getScheduleByStaff(): Observable<StaffSchedule[]> {
    return this.store.pipe(
      select(selectUserAuthenticated),
      filter(user => !!user),
      switchMap(
        user => this.httpClient.get<StaffSchedule[]>(`${ environment.apiUrl }/${ environment.apiPrefix }/schedules/staff/${ user.id }`, {
          responseType: 'json',
          observe: 'response'
        }).pipe(pluck('body'))
      )
    );
  }

  getScheduleByStaffFromStore(): Observable<StaffSchedule[]> {
    return this.store.pipe(
      select(selectStateStaffSchedules),
      select(selectAllSchedules)
    );
  }

  createSchedule(staffSchedules: StaffSchedule[]): Observable<StaffSchedule[]> {
    return this.store.pipe(
      select(selectUserAuthenticated),
      filter(user => !!user),
      map(user => {
        return staffSchedules.map(schedule => {
          return {
            ...schedule,
            user,
            valid: undefined,
            day: undefined
          };
        });
      }),
      map(schedules => {
        return schedules.map(schedule => {
          delete schedule.valid;
          delete schedule.day;
          return {
            ...schedule
          };
        });
      }),
      switchMap(schedules =>
        this.httpClient.post<StaffSchedule[]>(`${ environment.apiUrl }/${ environment.apiPrefix }/schedules`, schedules, {
          observe: 'response',
          responseType: 'json'
        }).pipe(pluck('body'), tap(schedulesResponse => this.store.dispatch(AddSchedulesAction({ schedules: schedulesResponse }))))
      )
    );
  }

  deleteSchedule(id: number): Observable<any> {
    return this.httpClient.delete(`${ environment.apiUrl }/${ environment.apiPrefix }/schedules/${ id }`, {
      observe: 'response',
      responseType: 'json'
    }).pipe(pluck('body'));
  }

}

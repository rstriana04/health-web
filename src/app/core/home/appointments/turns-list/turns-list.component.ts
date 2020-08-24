import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { StaffScheduleEvent } from '../../../../shared/models/staff-schedule-event';
import { AppState } from '../../../../store/reducers/app.reducer';
import { selectPatientSelected } from '../../../patient/store/selectors/patient.selectors';
import { AppointmentsService } from '../services/appointments.service';
import { selectCitationType } from '../store/selectors/appointment.selectors';

@Component({
  selector: 'health-turns-list',
  templateUrl: './turns-list.component.html',
  styleUrls: ['./turns-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TurnsListComponent implements OnInit {
  @Input() schedule: StaffScheduleEvent[];

  constructor(
    private store: Store<AppState>,
    private appointmentService: AppointmentsService
  ) { }

  ngOnInit(): void {
  }

  public scheduleAppointment(turn: StaffScheduleEvent) {
    this.store.pipe(
      select(selectPatientSelected),
      filter(patient => !!patient),
      map(patientSelected => {
        const patient = {
          ...patientSelected,
          user: undefined
        };
        delete patient.user;
        return {
          patient,
          user: {
            ...turn.user
          },
          citation: `${ turn.hour }`
        };
      }),
      switchMap(data => this.store.pipe(
        select(selectCitationType),
        filter(citationType => !!citationType),
        map(citationType => {
          return {
            ...data,
            citationType,
            type: 'create'
          };
        })
      )),
      filter(data => !!data),
      map(data => JSON.stringify(data)),
      take(1)
    ).subscribe(appointment => {
      this.appointmentService.setAppointment(appointment);
    });
  }
}

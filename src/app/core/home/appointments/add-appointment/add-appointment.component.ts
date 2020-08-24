import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppState } from '../../../../store/reducers/app.reducer';
import { Patient } from '../../../patient/models/patient';
import { PatientService } from '../../../patient/services/patient.service';
import { AddSelectedPatient } from '../../../patient/store/actions/patient.actions';
import { selectStaffScheduleSelected } from '../../../staff/store/selectors/staff-schedules.selectors';
import { Appointment } from '../models/appointment';
import { AppointmentsService } from '../services/appointments.service';
import { AddAppointment, AddCitationType } from '../store/actions/appointments.actions';

@Component({
  selector: 'health-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAppointmentComponent implements OnInit {
  patients$: Observable<Patient[]> = of([]);
  schedule$: Observable<any> = of([]);
  citationTypes = ['video', 'call'];

  constructor(
    private store: Store<AppState>,
    private patientService: PatientService,
    private appointmentService: AppointmentsService
  ) {
  }

  ngOnInit(): void {
    this.appointmentService.createConnectionSocket();
    this.appointmentService.getAppointments().pipe(
      filter(response => !!response),
      map(response => {
        return response as unknown as Appointment;
      })
    ).subscribe(appointment => {
      if ( appointment && Object.keys(appointment).length ) {
        this.store.dispatch(AddAppointment({ appointment }));
      }
    });
    this.schedule$ = this.getSchedule();
    this.patients$ = this.patientService.getPatientsByStaffFromStore();
  }

  private getSchedule(): Observable<any> {
    return this.store.pipe(
      select(selectStaffScheduleSelected),
      filter(schedule => !!schedule && !!Object.keys(schedule).length),
      map(daySchedule => {
        return daySchedule.events.map(day => {
          return {
            ...day,
            start: moment(day.start),
            end: moment(day.end)
          };
        });
      }),
      map(daySchedule => {
        return daySchedule.map(event => {
          const hoursSchedule = [];
          let i = 0;
          while ( event.start.isBefore(event.end) ) {
            hoursSchedule.push({
              ...event,
              hour: event.start.format('YYYY-MM-DD HH:mm:ss')
            });
            event.start.add(event.interval, 'm');
            i++;
          }
          console.log(hoursSchedule);
          return hoursSchedule;
        });
      })
      // tap(hoursSchedules => {
      //   console.log(hoursSchedules);
      //   // return hoursSchedules.map(hourSchedule => {
      //   //   const citation = !!hourSchedule.appointments.length ? hourSchedule.appointments.find(
      //   //     appointment => moment(appointment.citation).format('YYYY-MM-DD HH:mm:ss') === hourSchedule.hour) : {};
      //   //   return {
      //   //     ...hourSchedule,
      //   //     citation
      //   //   };
      //   // })
      // })
    );
  }

  public selectedPatient(patient: Patient, $event: MatOptionSelectionChange) {
    if ( $event.isUserInput ) {
      this.store.dispatch(AddSelectedPatient({ patient }));
    }
  }

  public setType(type: string) {
    this.store.dispatch(AddCitationType({ citationType: type }));
  }
}

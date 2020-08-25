import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { AppState } from '../../../../store/reducers/app.reducer';
import { Patient } from '../../../patient/models/patient';
import { PatientService } from '../../../patient/services/patient.service';
import { AddSelectedPatient } from '../../../patient/store/actions/patient.actions';
import { selectDateSelected, selectStaffScheduleSelected } from '../../../staff/store/selectors/staff-schedules.selectors';
import { Appointment } from '../models/appointment';
import { AppointmentsService } from '../services/appointments.service';
import { AddAppointment, AddCitationType } from '../store/actions/appointments.actions';
import { selectAppointmentsByDate, selectAppointmentState } from '../store/selectors/appointment.selectors';

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
    private appointmentService: AppointmentsService,
    private toastService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
        this.toastService.info('¡New Appointment!', '¡Info!', {
          progressBar: true,
          timeOut: 9000,
          progressAnimation: 'decreasing',
          closeButton: true
        });
      }
    });
    this.schedule$ = this.getSchedule();
    this.patients$ = this.patientService.getPatientsByStaffFromStore();
  }

  public getSchedule(): Observable<any> {
    return this.store.pipe(
      select(selectDateSelected),
      switchMap(dateSelected => this.store.pipe(
        select(selectAppointmentState),
        select(selectAppointmentsByDate, { date: dateSelected })
      )),
      switchMap(appointments => this.store.pipe(
        select(selectStaffScheduleSelected),
        map(staffSchedule => {
          return {
            appointments,
            staffSchedule
          };
        })
      )),
      filter(items => !!(  items.staffSchedule && Object.keys(items.staffSchedule).length )),
      map(items => {
        const daySchedule = items.staffSchedule.events.map(day => {
          return {
            ...day,
            start: moment(day.start),
            end: moment(day.end)
          };
        });
        return {
          appointments: items.appointments,
          daySchedule
        };
      }),
      map(items => {
        const hours = items.daySchedule.map(event => {
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
          return hoursSchedule;
        });
        return { appointments: items.appointments, hoursSchedules: hours };
      }),
      map(items => {
        return items.hoursSchedules.map(hours => {
          return hours.map(turn => {
            const citation = items.appointments.find(
              appointment => moment(appointment.citation).format('YYYY-MM-DD HH:mm:ss') === turn.hour);
            return {
              ...turn,
              citation
            };
          });
        });
      })
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

  public back() {
    this.router.navigate(['../list'], {relativeTo: this.activatedRoute});
  }
}

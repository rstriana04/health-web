import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from '../../../../store/reducers/app.reducer';
import { Appointment } from '../models/appointment';
import { AppointmentsService } from '../services/appointments.service';
import { AddSelectedAppointment } from '../store/actions/appointments.actions';
import { selectSelectedAppointment } from '../store/selectors/appointment.selectors';
import * as moment from 'moment';

@Component({
  selector: 'health-list-appointments',
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListAppointmentsComponent implements OnInit {
  appointments$: Observable<Appointment[]>;
  selectedAppointment$: Observable<Appointment>;
  constructor(
    private matDialog: MatDialog,
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appointmentService: AppointmentsService
  ) { }

  ngOnInit(): void {
    this.appointments$ = this.appointmentService.getAllAppointmentsFromStore();
    this.selectedAppointment$ = this.store.pipe(select(selectSelectedAppointment));
  }

  public addAppointment() {
    this.router.navigate(['../add'], { relativeTo: this.activatedRoute });
  }

  public addSelectedAppointment(appointment: Appointment) {
    this.store.dispatch(AddSelectedAppointment({appointment}));
  }

  public calculateAge(dateBirth: string) {
    return this.dateBirthToAge(moment(dateBirth).format('YYYY-MM-DD'));
  }

  dateBirthToAge(dateBirth: number | string): string {
    const now = +new Date().setHours(1);
    const dateBirthFormatted = +new Date(dateBirth);
    const unix = now - dateBirthFormatted;
    const age = ( unix / 1000 / 60 / 60 / 24 / 365 ).toFixed(1).split('.');
    return `${age[0]} years`;
  }
}

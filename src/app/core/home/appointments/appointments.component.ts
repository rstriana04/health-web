import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducers/app.reducer';
import { AttemptLoadAllPatients } from '../../patient/store/actions/patient.actions';
import { AttemptLoadStaffSchedules } from '../../staff/store/actions/staff-schedules.actions';
import { AttemptGetAllAppointmentsAction } from './store/actions/appointments.actions';

@Component({
  selector: 'health-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentsComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(AttemptLoadAllPatients());
    this.store.dispatch(AttemptLoadStaffSchedules());
    this.store.dispatch(AttemptGetAllAppointmentsAction());
  }

}

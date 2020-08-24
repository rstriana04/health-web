import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../../../shared/shared.module';
import { PatientEffects } from '../../patient/store/effects/patient.effects';
import { StaffSchedulesEffects } from '../../staff/store/effects/staff-schedules.effects';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments.component';
import { ListAppointmentsComponent } from './list-appointments/list-appointments.component';
import { AppointmentEffects } from './store/effects/appointment.effects';
import { TurnsListComponent } from './turns-list/turns-list.component';

@NgModule({
  declarations: [AppointmentsComponent, ListAppointmentsComponent, AddAppointmentComponent, TurnsListComponent],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    SharedModule,
    EffectsModule.forFeature([PatientEffects, StaffSchedulesEffects, AppointmentEffects])
  ]
})
export class AppointmentsModule {}

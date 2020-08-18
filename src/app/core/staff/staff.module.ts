import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../../shared/shared.module';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffScheduleComponent } from './staff-schedule/staff-schedule.component';
import { StaffComponent } from './staff.component';
import { StaffSchedulesEffects } from './store/effects/staff-schedules.effects';

@NgModule({
  declarations: [StaffComponent, StaffScheduleComponent, AddScheduleComponent],
  imports: [
    CommonModule,
    StaffRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([StaffSchedulesEffects])
  ]
})
export class StaffModule {}

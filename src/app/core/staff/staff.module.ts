import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffComponent } from './staff.component';
import { StaffScheduleComponent } from './staff-schedule/staff-schedule.component';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';


@NgModule({
  declarations: [StaffComponent, StaffScheduleComponent, AddScheduleComponent],
  imports: [
    CommonModule,
    StaffRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class StaffModule { }

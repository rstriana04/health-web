import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MaterialModule } from './modules/material/material.module';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { SelectDaysComponent } from './components/select-days/select-days.component';

@NgModule({
  declarations: [ScheduleComponent, SelectDaysComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FormsModule
  ],
  exports: [
    MaterialModule,
    ScheduleComponent,
    SelectDaysComponent
  ]
})
export class SharedModule {}

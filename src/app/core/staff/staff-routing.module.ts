import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffScheduleComponent } from './staff-schedule/staff-schedule.component';
import { StaffComponent } from './staff.component';

const routes: Routes = [
  {
    path: '', component: StaffComponent, children: [
      { path: '', redirectTo: 'schedule', pathMatch: 'full' },
      { path: 'schedule', component: StaffScheduleComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule {}

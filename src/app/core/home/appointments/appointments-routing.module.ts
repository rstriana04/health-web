import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { AppointmentsComponent } from './appointments.component';
import { ListAppointmentsComponent } from './list-appointments/list-appointments.component';

const routes: Routes = [
  {
    path: '', component: AppointmentsComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListAppointmentsComponent },
      { path: 'add', component: AddAppointmentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule {}

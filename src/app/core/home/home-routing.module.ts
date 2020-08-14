import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', redirectTo: 'appointments', pathMatch: 'full' },
      { path: 'appointments', loadChildren: () => import('./appointments/appointments.module').then(m => m.AppointmentsModule) },
      { path: 'patients', loadChildren: () => import('../patient/patient.module').then(m => m.PatientModule) },
      { path: 'staff', loadChildren: () => import('../staff/staff.module').then(m => m.StaffModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}

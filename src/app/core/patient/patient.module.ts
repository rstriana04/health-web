import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../../shared/shared.module';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { ListPatientsComponent } from './list-patients/list-patients.component';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { PatientEffects } from './store/effects/patient.effects';

@NgModule({
  declarations: [PatientComponent, ListPatientsComponent, AddPatientComponent],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([PatientEffects])
  ]
})
export class PatientModule {}

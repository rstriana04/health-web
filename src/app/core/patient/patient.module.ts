import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { ListPatientsComponent } from './list-patients/list-patients.component';
import { AddPatientComponent } from './add-patient/add-patient.component';


@NgModule({
  declarations: [PatientComponent, ListPatientsComponent, AddPatientComponent],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PatientModule { }

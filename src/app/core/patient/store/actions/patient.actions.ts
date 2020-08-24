import { createAction, props } from '@ngrx/store';
import { Patient } from '../../models/patient';

export const AddPatient = createAction('[Patients] Add Patient', props<{ patient: Patient }>());
export const AttemptLoadAllPatients = createAction('[Patients] Attempt Load All Patients');
export const SuccessfulAttemptLoadAllPatients =
  createAction('[Patients] Successful Attempt Load All Patients', props<{ patients: Patient[] }>());
export const FailedAttemptLoadAllPatients = createAction('[Patients] Failed attempt Load All Patients', props<{ message: string }>());
export const AddSelectedPatient = createAction('[Patients] Add Selected Patient', props<{patient: Patient}>());


import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Patient } from '../../models/patient';
import * as PatientActions from '../actions/patient.actions';

export interface PatientState extends EntityState<Patient> {
  selectedPatient: Patient;
}

export const adapterPatient: EntityAdapter<Patient> = createEntityAdapter<Patient>();

export const initialStatePatient: PatientState = adapterPatient.getInitialState(
  {
    selectedPatient: undefined
  }
);

const reducer = createReducer(initialStatePatient,
  on(PatientActions.AddPatient, (state, { patient }) => adapterPatient.upsertOne(patient, state)),
  on(PatientActions.SuccessfulAttemptLoadAllPatients, (state, { patients }) => adapterPatient.setAll(patients, state)),
  on(PatientActions.AddSelectedPatient, (state, { patient }) => ( {
    ...state,
    selectedPatient: patient
  } )),
  on(PatientActions.RemovePatient, (state, { id }) => adapterPatient.removeOne(id, state))
);

export function PatientReducer(state: PatientState | undefined, action: Action) {
  return reducer(state, action);
}

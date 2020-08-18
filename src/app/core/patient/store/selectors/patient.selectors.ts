import { createSelector } from '@ngrx/store';
import { selectHomeState } from '../../../home/store/selectors/home.selectors';
import { Patient } from '../../models/patient';
import { adapterPatient } from '../reducers/patient.reducer';

export const selectStatePatient = createSelector(selectHomeState, state => state.patients);
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapterPatient.getSelectors();

export const selectAllPatients = selectAll;
export const selectAllPatientsByStaff = createSelector(selectAllPatients, (patients: Patient[], props: { user: number }) => {
  return patients.filter(patient => patient.user.id === props.user);
});

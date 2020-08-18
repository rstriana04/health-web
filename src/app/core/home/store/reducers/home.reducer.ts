import { ActionReducerMap } from '@ngrx/store';
import { PatientReducer, PatientState } from '../../../patient/store/reducers/patient.reducer';
import { StaffSchedulesReducer, StaffSchedulesState } from '../../../staff/store/reducers/staff-schedules.reducer';

export interface HomeState {
  patients: PatientState;
  staffSchedule: StaffSchedulesState;
}

export const HomeReducer: ActionReducerMap<HomeState> = {
  patients: PatientReducer,
  staffSchedule: StaffSchedulesReducer
};

import { createAction, props } from '@ngrx/store';
import { Appointment } from '../../models/appointment';

export const AttemptGetAllAppointmentsAction = createAction('[Appointments] Attempt Get All Appointments');
export const SuccessAttemptGetAllAppointmentsAction = createAction('[Appointments] Success Attempt Get All Appointments',
  props<{ appointments: Appointment[] }>());
export const FailedAttemptGetAllAppointmentsAction = createAction('[Appointments] Failed Attempt Get All Appointments',
  props<{ message: string }>());
export const AddSelectedAppointment = createAction('[Appointments] Add Selected Appointment', props<{ appointment: Appointment }>());
export const AddCitationType = createAction('[Appointments] Add Citation type', props<{ citationType: string }>());
export const AddAppointment = createAction('[Appointments] Add Appointment', props<{appointment: Appointment}>());
export const RemoveAppointment = createAction('[Appointments] Remove Appointment', props<{id: number}>());
export const RemoveSelectedAppointment = createAction('[Appointments] Remove Selected Appointment');

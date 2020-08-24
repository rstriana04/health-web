import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Appointment } from '../../models/appointment';
import * as AppointmentActions from '../actions/appointments.actions';

export interface AppointmentState extends EntityState<Appointment> {
  message: string;
  selectedAppointment: Appointment;
  citationType: string;
}

export const adapterAppointment: EntityAdapter<Appointment> = createEntityAdapter<Appointment>();

export const initialStateAppointment: AppointmentState = adapterAppointment.getInitialState({
  message: '',
  selectedAppointment: undefined,
  citationType: ''
});

const reducer = createReducer(initialStateAppointment,
  on(AppointmentActions.AttemptGetAllAppointmentsAction),
  on(AppointmentActions.SuccessAttemptGetAllAppointmentsAction,
    (state, { appointments }) => adapterAppointment.addMany(appointments, state)),
  on(AppointmentActions.AddAppointment,
    (state, { appointment }) => adapterAppointment.setOne(appointment, state)),
  on(AppointmentActions.FailedAttemptGetAllAppointmentsAction),
  on(AppointmentActions.AddSelectedAppointment, (state, { appointment }) => ( {
    ...state,
    selectedAppointment: appointment
  } )),
  on(AppointmentActions.AddCitationType, (state, { citationType }) => ( {
    ...state,
    citationType
  } ))
);

export function AppointmentReducer(state: AppointmentState | undefined, action: Action) {
  return reducer(state, action);
}

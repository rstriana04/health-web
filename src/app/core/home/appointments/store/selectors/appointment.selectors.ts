import { createSelector } from '@ngrx/store';
import { selectHomeState } from '../../../store/selectors/home.selectors';
import { Appointment } from '../../models/appointment';
import { adapterAppointment } from '../reducers/appointment.reducer';
import * as moment from 'moment';

export const selectAppointmentState = createSelector(selectHomeState, state => state.appointments);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapterAppointment.getSelectors();

export const selectAllAppointments = selectAll;
export const selectTotalAppointments = selectTotal;

export const selectAllAppointmentByUserId = createSelector(selectAllAppointments,
  (appointments: Appointment[], props: { userId: number }) => {
    return appointments.filter(appointment => appointment.user.id === props.userId);
  });

export const selectSelectedAppointment = createSelector(selectAppointmentState, state => state.selectedAppointment);
export const selectCitationType = createSelector(selectAppointmentState, state => state.citationType);
export const selectAppointmentsByDate = createSelector(selectAllAppointments, (appointments: Appointment[], props: { date: string }) => {
  return appointments.filter(appointment => moment(appointment.citation).format('YYYY-MM-DD') === moment(props.date).format('YYYY-MM-DD'));
});


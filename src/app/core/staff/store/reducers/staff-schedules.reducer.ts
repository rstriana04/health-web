import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { DayEvent } from '../../../../shared/models/day-event';
import { StaffScheduleEvent } from '../../../../shared/models/staff-schedule-event';
import { StaffSchedule } from '../../models/staff-schedule';
import * as StaffSchedulesAction from '../actions/staff-schedules.actions';

export interface StaffSchedulesState extends EntityState<StaffSchedule> {
  scheduleSelected: DayEvent;
  message: string;
}

export const adapterStaffSchedules: EntityAdapter<StaffSchedule> = createEntityAdapter<StaffSchedule>({});
export const initialStateStaffSchedules: StaffSchedulesState = adapterStaffSchedules.getInitialState({
  scheduleSelected: {} as DayEvent,
  message: undefined
});

const reducer = createReducer(initialStateStaffSchedules,
  on(StaffSchedulesAction.AttemptLoadStaffSchedules),
  on(StaffSchedulesAction.SuccessAttemptLoadStaffSchedules, (state, { schedules }) => adapterStaffSchedules.addMany(schedules, state)),
  on(StaffSchedulesAction.FailedAttemptLoadStaffSchedules, (state, { message }) => ( {
    ...state,
    message
  } )),
  on(StaffSchedulesAction.AddSchedulesAction, (state, { schedules }) => adapterStaffSchedules.addMany(schedules, state)),
  on(StaffSchedulesAction.AddScheduleSelected, (state, { schedule }) => ( {
    ...state,
    scheduleSelected: schedule
  } ))
);

export function StaffSchedulesReducer(state: StaffSchedulesState | undefined, action: Action) {
  return reducer(state, action);
}

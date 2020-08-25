import { createAction, props } from '@ngrx/store';
import { DayEvent } from '../../../../shared/models/day-event';
import { StaffSchedule } from '../../models/staff-schedule';

export const AttemptLoadStaffSchedules = createAction('[Staff Schedule] Attempt Load Staff Schedules');
export const SuccessAttemptLoadStaffSchedules = createAction('[Staff Schedule] Success Attempt Load Staff Schedules',
  props<{ schedules: StaffSchedule[] }>());
export const FailedAttemptLoadStaffSchedules = createAction('[Staff Schedule] Failed Attempt Load Staff Schedules',
  props<{ message: string }>());
export const AddSchedulesAction = createAction('[Staff Schedule] Add Schedules', props<{ schedules: StaffSchedule[] }>());

export const AddScheduleSelected = createAction('[Staff Schedule] Add Schedule Selected', props<{ schedule: DayEvent }>());
export const AddDateSelected = createAction('[Staff Schedule] Add Date Selected', props<{ dateSelected: string }>());
export const RemoveSchedule = createAction('[Staff Schedule] Remove Schedule', props<{id: number}>());

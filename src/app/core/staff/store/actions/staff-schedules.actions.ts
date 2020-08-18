import { createAction, props } from '@ngrx/store';
import { StaffSchedule } from '../../models/staff-schedule';

export const AttemptLoadStaffSchedules = createAction('[Staff Schedule] Attempt Load Staff Schedules');
export const SuccessAttemptLoadStaffSchedules = createAction('[Staff Schedule] Success Attempt Load Staff Schedules',
  props<{ schedules: StaffSchedule[] }>());
export const FailedAttemptLoadStaffSchedules = createAction('[Staff Schedule] Failed Attempt Load Staff Schedules',
  props<{ message: string }>());
export const AddSchedulesAction = createAction('[Staff Schedule] Add Schedules', props<{ schedules: StaffSchedule[] }>());

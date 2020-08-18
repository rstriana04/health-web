import { createSelector } from '@ngrx/store';
import { selectHomeState } from '../../../home/store/selectors/home.selectors';
import { adapterStaffSchedules } from '../reducers/staff-schedules.reducer';

export const selectStateStaffSchedules = createSelector(selectHomeState, state => state.staffSchedule);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapterStaffSchedules.getSelectors();

export const selectAllSchedules = selectAll;

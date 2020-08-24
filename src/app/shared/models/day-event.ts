import { StaffScheduleEvent } from './staff-schedule-event';

export interface DayEvent {
  badgeTotal: number;
  date: string;
  day: number;
  events: StaffScheduleEvent[];
  inMonth: boolean;
  isFuture: boolean;
  isPast: boolean;
  isToday: boolean;
  isWeekend: boolean;
}

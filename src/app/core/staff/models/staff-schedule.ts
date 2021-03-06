import { Appointment } from '../../home/appointments/models/appointment';
import { User } from '../../sign-up/models/user';

export interface StaffSchedule {
  id?: number;
  date: string;
  timeFrom: string;
  timeUntil: string;
  interval: number;
  user?: User;
  valid?: boolean;
  day?: number;
  citation?: Appointment
}

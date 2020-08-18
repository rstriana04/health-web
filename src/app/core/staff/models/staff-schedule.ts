import { User } from '../../sign-up/models/user';

export interface StaffSchedule {
  id?: number;
  date: string;
  timeFrom: string;
  timeUntil: string;
  user?: User;
  valid?: boolean;
  day?: number;
}

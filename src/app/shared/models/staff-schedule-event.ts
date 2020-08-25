import { Appointment } from '../../core/home/appointments/models/appointment';
import { User } from '../../core/sign-up/models/user';

export interface StaffScheduleEvent {
  actions: any;
  color: any;
  createdAt: string;
  date: string;
  draggable: boolean;
  end: string;
  id: number;
  interval: number;
  resizable: { beforeStart: boolean, afterEnd: boolean };
  start: string;
  timeFrom: string;
  timeUntil: string;
  title: string;
  updatedAt: string;
  user: User;
  hour?: string;
  citation?: Appointment
}

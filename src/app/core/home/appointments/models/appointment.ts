import { Patient } from '../../../patient/models/patient';
import { User } from '../../../sign-up/models/user';

export interface Appointment {
  id?: number;
  citation: string;
  citationType: string;
  user: User;
  patient: Patient;
}

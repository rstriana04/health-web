import { User } from '../../sign-up/models/user';

export interface Patient {
  createdAt?: string;
  dateBirth: string;
  gender: string;
  id?: number;
  lastName: string;
  name: string;
  phone: string;
  updatedAt?: string;
  user?: User;
}

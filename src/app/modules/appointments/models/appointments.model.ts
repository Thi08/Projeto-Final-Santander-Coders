import { Time } from '@angular/common';
import { AppointmentStatus } from '../constants/status.enum';

export interface Appointment {
  id: string;
  specialty: string;
  doctor: string;
  date: Date;
  time: Time;
  obs: string;
  status: AppointmentStatus;
}

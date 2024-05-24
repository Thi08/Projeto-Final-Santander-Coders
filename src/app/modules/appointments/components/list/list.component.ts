import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Appointment } from '../../models/appointments.model';
import { Router, RouterModule } from '@angular/router';
import { AppointmentsService } from '../../services/appointments.service';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';
import { UserRoles } from '../../../auth/constants/user-roles.enum';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
    RouterModule,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  appointments?: Appointment[];
  userRole?: UserRoles;

  constructor(
    private router: Router,
    private appointmentService: AppointmentsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllAppointments();
    this.getRoleUser();
  }

  getAllAppointments() {
    this.appointmentService.getAllAppointments().subscribe({
      next: (result) => {
        this.appointments = result;
        console.log(result);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getRoleUser() {
    this.authService.checkUserRoles().subscribe({
      next: (userRole) => {
        this.userRole = userRole;
        console.log('User Role:', this.userRole);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  showCancelConfirmationMessage(appointment: Appointment): void {
    console.log(appointment);
    if (
      confirm(
        `Deseja cancelar a seguinte consulta?\n${
          appointment.specialty
        }\n${new Date(appointment.date).toLocaleDateString()} - ${
          appointment.time
        }`
      )
    ) {
      this.cancelAppointment(appointment.id);
    }
  }

  editAppointment(id: string): void {
    this.router.navigate(['appointments', 'edit', id]);
  }

  cancelAppointment(id: string) {
    this.appointmentService.cancelAppointment(id).subscribe({
      next: () => {
        this.getAllAppointments();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  deleteAppointment(id: string) {
    this.appointmentService.deleteAppointment(id).subscribe({
      next: () => {
        this.getAllAppointments();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  completeAppointment(id: string): void {
    this.appointmentService.completeAppointment(id).subscribe({
      next: () => {
        this.getAllAppointments();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}

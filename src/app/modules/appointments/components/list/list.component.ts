import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Appointment } from '../../models/appointments.model';
import { Router, RouterModule } from '@angular/router';
import { AppointmentsService } from '../../services/appointments.service';
import { DatePipe } from '@angular/common';

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
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  appointments?: Appointment[];

  constructor(
    private router: Router,
    private appointmentService: AppointmentsService
  ) {}

  ngOnInit(): void {
    this.getAllApointments();
  }

  getAllApointments() {
    this.appointmentService.getAllAppointments().subscribe({
      next: (result) => {
        this.appointments = result;
        console.log(result);
      },
      error: (err) => {},
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
    )
      this.cancelAppointment(appointment.id);
  }

  editAppointment(id: string): void {
    this.router.navigate(['appointments', 'edit', id]);
  }

  cancelAppointment(id: string) {
    this.appointmentService.cancelAppointment(id).subscribe({
      next: (result) => {
        this.getAllApointments();
      },
    });
  }
}

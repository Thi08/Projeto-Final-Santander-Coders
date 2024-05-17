import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Appointments } from '../../models/appointments.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  appointments?: Appointments[];

  constructor(private router: Router) {}

  openDialog(id: string): void {
    console.log('openDialog');
  }

  editAppointment(id: string): void {
    this.router.navigate(['appointments', 'edit', id]);
  }
}

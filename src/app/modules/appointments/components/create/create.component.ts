import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppointmentsService } from '../../services/appointments.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    provideNativeDateAdapter(),
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  form!: FormGroup;

  id?: string;

  constructor(
    private router: Router,
    private appointmentService: AppointmentsService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = new FormGroup({
      specialty: new FormControl(null, [Validators.required]),
      doctor: new FormControl(null, [Validators.required]),
      date: new FormControl(new Date(), [Validators.required]),
      time: new FormControl(null, [Validators.required]),
      obs: new FormControl(null, [Validators.required]),
    });
  }

  createAppointment() {
    this.appointmentService
      .createAppointment(this.form.getRawValue())
      .subscribe({
        next: (result) => {
          this.router.navigate(['appointments', 'list']);
        },
        error: (err) => {
          alert(err);
        },
      });
  }
}

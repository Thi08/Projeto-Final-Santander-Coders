import { Component } from '@angular/core';
import {
  FormBuilder,
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
import { Appointment } from '../../models/appointments.model';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';

@Component({
  selector: 'app-edit',
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
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  form: FormGroup = this.fb.group({
    id: this.fb.control(null),
    specialty: this.fb.control(null, [Validators.required]),
    doctor: this.fb.control(null, [Validators.required]),
    date: this.fb.control(null, [Validators.required]),
    time: this.fb.control(null, [Validators.required]),
    obs: this.fb.control(null, [Validators.required]),
  });

  id!: string | null;

  appointment: Appointment | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appointmentService: AppointmentsService,
    private fb: FormBuilder
  ) {
    this.verifyAppoitmentId();
  }

  ngOnInit(): void {}

  verifyAppoitmentId() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (!this.id) {
        this.router.navigate(['appointments', 'list']);
      }
      this.getAppointmentById();
    });
  }

  getAppointmentById() {
    this.appointmentService.getAppointmentsById(this.id!).subscribe({
      next: (result) => {
        this.appointment = result;
        this.buildForm();
      },
      error: (err) => {
        console.log(err);
        this.router.navigate(['appointments', 'list']);
      },
    });
  }

  buildForm(): void {
    if (!this.appointment) {
      console.log('Appointment Not Found');
    } else {
      console.log(this.appointment);
      this.form.controls['specialty'].setValue(this.appointment.specialty);
      this.form.controls['doctor'].setValue(this.appointment.doctor);
      this.form.controls['date'].setValue(this.appointment.date);
      this.form.controls['time'].setValue(this.appointment.time);
      this.form.controls['obs'].setValue(this.appointment.obs);
    }
  }

  saveAppointment() {
    let formValues = this.form.value;
    this.appointment!.specialty = formValues.specialty;
    this.appointment!.doctor = formValues.doctor;
    this.appointment!.date = formValues.date;
    this.appointment!.time = formValues.time;
    this.appointment!.obs = formValues.obs;

    this.appointmentService.editAppointment(this.appointment!).subscribe({
      next: (result) => {
        this.router.navigate(['appointments', 'list']);
      },
      error: (err) => console.log(err),
    });
  }
}

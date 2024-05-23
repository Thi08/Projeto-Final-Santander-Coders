import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointments.model';
import { Constants } from '../../auth/constants/constants.enum';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  readonly url = `${environment.apiUrl}/appointments`;

  constructor(private httpClient: HttpClient) {}

  getAllAppointments(): Observable<Appointment[]> {
    var token = localStorage.getItem(Constants.TOKEN_KEY)!;
    var header = new HttpHeaders().append('authorization', token);
    return this.httpClient.get<Appointment[]>(this.url, {
      headers: header,
    });
  }

  getAppointmentsById(id: string): Observable<Appointment> {
    var token = localStorage.getItem(Constants.TOKEN_KEY)!;
    var header = new HttpHeaders().append('authorization', token);
    return this.httpClient.get<Appointment>(`${this.url}/${id}`, {
      headers: header,
    });
  }

  editAppointment(appointment: Appointment): Observable<any> {
    var token = localStorage.getItem(Constants.TOKEN_KEY)!;
    var header = new HttpHeaders().append('authorization', token);
    return this.httpClient.put(`${this.url}/${appointment.id}`, appointment, {
      headers: header,
    });
  }

  createAppointment(appointment: Appointment): Observable<any> {
    var token = localStorage.getItem(Constants.TOKEN_KEY)!;
    var header = new HttpHeaders().append('authorization', token);
    return this.httpClient.post(`${this.url}`, appointment, {
      headers: header,
    });
  }

  deleteAppointment(id: string): Observable<any> {
    var token = localStorage.getItem(Constants.TOKEN_KEY)!;
    var header = new HttpHeaders().append('authorization', token);
    return this.httpClient.delete(`${this.url}/${id}`, {
      headers: header,
    });
  }

  cancelAppointment(id: string): Observable<any> {
    var token = localStorage.getItem(Constants.TOKEN_KEY)!;
    var header = new HttpHeaders().append('authorization', token);
    return this.httpClient.put(`${this.url}/cancel/${id}`, null, {
      headers: header,
    });
  }

  completeAppointment(id: string): Observable<any> {
    var token = localStorage.getItem(Constants.TOKEN_KEY)!;
    var header = new HttpHeaders().append('authorization', token);
    return this.httpClient.put(`${this.url}/done/${id}`, null, {
      headers: header,
    });
  }
}

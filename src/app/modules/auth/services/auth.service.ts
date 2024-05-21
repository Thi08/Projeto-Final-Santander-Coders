import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserCredentials } from '../models/userCredentials';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../models/loginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly url = `${environment.apiUrl}/auth`;

  constructor(private httpClient: HttpClient) {}

  login(credentials: UserCredentials): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      `${this.url}/login`,
      credentials
    );
  }

  register(newUser: User): Observable<any> {
    return this.httpClient.post(`${this.url}/register`, newUser);
  }
}

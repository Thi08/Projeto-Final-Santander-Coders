import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserCredentials } from '../models/userCredentials';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../models/loginResponse';
import { Constants } from '../constants/constants.enum';
import { UserRoles } from '../constants/user-roles.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly url = `${environment.apiUrl}/auth`; 
  isLogged = new BehaviorSubject<boolean>(false);
  private loggedUsername = new BehaviorSubject<string>('')
  loggedUsername$ = this.loggedUsername.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(credentials: UserCredentials): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      `${this.url}/login`,
      credentials
    );
  }

  register(newUser: User): Observable<any> {
    return this.httpClient.post(`${this.url}/register`, newUser);
  }

  checkAuthStatus(): Observable<boolean> {
    if(typeof window !== 'undefined' && localStorage){
      const token = localStorage.getItem(Constants.TOKEN_KEY);
      this.isLogged.next(!!token);
    }
    return this.isLogged;
  }

  checkUserRoles(): Observable<UserRoles> {
    const userRole = localStorage.getItem(Constants.USER_ROLES) as UserRoles;
    return new Observable<UserRoles>((observer) => {
      observer.next(userRole);
    });
  }

  getLoggedUsername(username: string){
    this.loggedUsername.next(username)
  }

  logout(): void {
    localStorage.removeItem(Constants.TOKEN_KEY);
    localStorage.removeItem(Constants.USER_ROLES);
    this.router.navigate(['auth', 'login'])
  }
}

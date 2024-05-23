import { Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { AppointmentsComponent } from './modules/appointments/appointments.component';
import { ListComponent } from './modules/appointments/components/list/list.component';
import { CreateComponent } from './modules/appointments/components/create/create.component';
import { authGuard } from './modules/auth/guards/auth.guard';
import { rolesGuard } from './modules/auth/guards/roles.guard';
import { UserRoles } from './modules/auth/constants/user-roles.enum';
import { EditComponent } from './modules/appointments/components/edit/edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'appointments/list', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'appointments',
    component: AppointmentsComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'list',
        component: ListComponent,
        canActivate: [rolesGuard],
        data: {roles: [UserRoles.ADMIN, UserRoles.USER]}
      },
      {
        path: 'create',
        component: CreateComponent,
        canActivate: [rolesGuard],
        data: {roles: [UserRoles.ADMIN]}
      },
      {
        path: 'edit',
        component: EditComponent,
        canActivate: [rolesGuard],
        data: {roles: [UserRoles.ADMIN]}
      },
    ],
  },
];

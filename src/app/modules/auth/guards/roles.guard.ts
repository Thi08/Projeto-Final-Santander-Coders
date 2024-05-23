import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const rolesGuard: CanActivateFn = (activatedRoute) => {
  const authService = inject(AuthService)

  return authService.checkUserRoles().pipe(map((userRole) => {
    const userCanDo = activatedRoute.data['roles'].includes(userRole);
    return userCanDo ? true : createUrlTreeFromSnapshot(activatedRoute, ['/', 'auth', 'login'])
  }))
};

import { CanActivateFn, createUrlTreeFromSnapshot} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (ActivatedRoute) => {
  const authService = inject(AuthService)

  return authService.checkAuthStatus().pipe(map((isLogged) =>{
      return isLogged ? true : createUrlTreeFromSnapshot(ActivatedRoute, ['/', 'auth', 'login'])
  }))
};

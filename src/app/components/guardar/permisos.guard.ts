import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../component-funcionality/services/login/login.service';

export const permisosGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);

  if(!authService.getIsLoggerd()){
    router.navigate(['/']);
    return false;
  }
  return true;
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../login/services/login.service';

export const permissionsGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);

  if(!authService.getIsLoggerd()){
    router.navigate(['/']);
    return false;
  }
  return true;
};

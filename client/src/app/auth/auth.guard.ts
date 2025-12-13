import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { from, mergeMap, of } from 'rxjs';
import { AuthenticationService } from './authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (route.url?.[0]?.path === 'login') {
    if (authService.isLoggedIn()) {
      return authService.validateLogin()
        .pipe(
          mergeMap(loginValidated => {
            if (loginValidated) {
              return from(router.navigateByUrl('/'))
            }
            return of(loginValidated);
          })
        )
    }
    return true
  } else {
    if (authService.isLoggedIn()) {
      return true;
    }
    return router.navigate(['/login']);
  }
};

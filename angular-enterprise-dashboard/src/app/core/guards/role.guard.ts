import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { UserRole } from '../models/user.model';
import { AuthStore } from '../store/auth.store';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  const roles = (route.data['roles'] as UserRole[] | undefined) ?? [];
  return authStore.hasRole(roles) ? true : router.createUrlTree(['/dashboard']);
};
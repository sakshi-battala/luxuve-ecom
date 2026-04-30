import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const auth = inject(Auth);

  const currentUser = await firstValueFrom(authState(auth));
  console.log(currentUser);

  if (currentUser) return true;
  router.navigateByUrl('/login');

  return false;
};

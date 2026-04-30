import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

export const guestGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const auth = inject(Auth);

  const currentUser = await firstValueFrom(authState(auth));
  console.log(currentUser);

  if (!currentUser) return true;
  router.navigateByUrl('/home');
  return false;
};

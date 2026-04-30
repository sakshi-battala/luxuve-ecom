import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private notyf = new Notyf({
    duration: 2000,
    position: { x: 'center', y: 'top' },
  });

  success(msg: string) {
    this.notyf.success(msg);
  }

  error(msg: string) {
    this.notyf.error(msg);
  }
}

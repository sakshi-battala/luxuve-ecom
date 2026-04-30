import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  email = signal<string>('');
  password = signal<string>('');
  showPassword = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
  ) {}

  async onSignup(event: Event) {
    event.preventDefault();

    if (!this.email() || !this.password()) {
      this.toastService.error('Please fill in all fields');
      return;
    }

    if (this.isLoading()) return;
    this.isLoading.set(true);

    try {
      await this.authService.signup(this.email(), this.password());
      this.toastService.success('Welcome! Your account has been created');
      this.router.navigateByUrl('/home');
    } catch (error: any) {
      const message = error.code
        .replace('auth/', '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c: any) => c.toUpperCase());
      this.toastService.error(message);
      return;
    } finally {
      this.isLoading.set(false);
      this.email.set('');
      this.password.set('');
    }
  }

  async onGoogleSignup() {
    if (this.isLoading()) return;
    this.isLoading.set(true);

    try {
      await this.authService.googleSignin();
      this.toastService.success('Welcome! Signed in with Google');
      this.router.navigateByUrl('/home');
    } catch (error: any) {
      const message = error.code
        .replace('auth/', '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c: any) => c.toUpperCase());
      this.toastService.error(message);
      return;
    } finally {
      this.isLoading.set(false);
    }
  }

  togglePassword() {
    this.showPassword.update((prev) => !prev);
  }
}

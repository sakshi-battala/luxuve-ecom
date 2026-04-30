import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = signal<string>('');
  password = signal<string>('');
  showPassword = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
  ) {}

  async onLogin(event: Event) {
    event.preventDefault();

    if (!this.email() || !this.password()) {
      this.toastService.error('Please fill in all fields');
      return;
    }

    if (this.isLoading()) return;
    this.isLoading.set(true);

    try {
      await this.authService.login(this.email(), this.password());
      this.toastService.success('Welcome back!');
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

  async onGoogleLogin() {
    if (this.isLoading()) return;
    this.isLoading.set(true);

    try {
      await this.authService.googleSignin();
      this.toastService.success('Login successful');
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

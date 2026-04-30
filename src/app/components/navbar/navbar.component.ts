import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isScrolled = false;
  isDarkMode = true;
  isMenuOpen = false;

  constructor(
    public authService: AuthService,
    public cartService: CartService,
    private router: Router,
    private toastService: ToastService,
  ) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    const theme = this.isDarkMode ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', theme);
  }

  async logout() {
    try {
      await this.authService.logout();

      this.toastService.success('Logged out successfully');

      this.router.navigateByUrl('/login');
    } catch (error) {
      this.toastService.error('Failed to logout');
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    document.body.style.overflow = this.isMenuOpen ? 'hidden' : 'auto';
  }

  get isLoggedIn() {
    return !!this.authService.currentUser();
  }

  onNavigateToCart(event: Event) {
    event.stopPropagation();
    this.router.navigateByUrl('/cart');
  }

}

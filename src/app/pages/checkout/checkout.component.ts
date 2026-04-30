import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  private router = inject(Router);
  private cartService = inject(CartService);

  currentStep = 1;
  showSuccess = false;
  showAddressError = false;

  paymentMethod: 'UPI' | 'COD' | null = null;

  address = {
    name: '',
    street: '',
    city: '',
    zip: '',
  };

  setStep(step: number) {
    if (step === 2 && this.isAddressInvalid()) {
      this.showAddressError = true;
      return;
    }

    this.showAddressError = false;
    this.currentStep = step;
  }

  isAddressInvalid(): boolean {
    return (
      !this.address.name ||
      !this.address.street ||
      !this.address.city ||
      !this.address.zip
    );
  }

  isAddressValid(): boolean {
    return !this.isAddressInvalid();
  }

  processOrder() {
    if (!this.paymentMethod) return;

    this.showSuccess = true;

    this.cartService.cartItems.set([]);

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 5000);
  }
}

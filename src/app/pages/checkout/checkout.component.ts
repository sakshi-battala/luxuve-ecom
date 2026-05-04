import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  private router = inject(Router);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private orderService = inject(OrderService);

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

  async processOrder() {
    if (!this.paymentMethod) return;

    const user = this.authService.currentUser();

    if (!user) return;

    const order = {
      userId: user.uid,
      customerEmail: user.email,
      items: this.cartService.cartItems(),
      totalItems: this.cartService.cartCount(),
      paymentMethod: this.paymentMethod,
      shippingAddress: this.address,
      status: 'pending',
      createdAt: new Date(),
    };

    console.log(order)

    try {
      await this.orderService.placeOrder(order);
      this.showSuccess = true;
      this.cartService.cartItems.set([]);
      localStorage.removeItem('cart');
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  }
}

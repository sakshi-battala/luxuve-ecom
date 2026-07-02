import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private cartService = inject(CartService);

  itemsInCart = this.cartService.cartItems; // Signal from service

  subtotal = computed(() => {
    return this.itemsInCart().reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
  });

  updateQty(id: number, delta: number) {
    this.cartService.updateQuantity(id, delta);
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }
}

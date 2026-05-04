import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<any[]>([]);

  constructor() {
    // const storedCart = localStorage.getItem('cart');
    // if (storedCart) {
    //   this.cartItems.set(JSON.parse(storedCart));
    // }
  }

  cartCount = computed(() => {
    return this.cartItems().reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  });

  addToCart(product: any) {
    const currentCart = this.cartItems();
    const existingProduct = currentCart.find((p) => p.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
      this.cartItems.set([...currentCart]);
    } else {
      this.cartItems.set([...currentCart, { ...product, quantity: 1 }]);
    }

    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }

  updateQuantity(id: number, delta: number) {
    const updatedCart = this.cartItems()
      .map((item) => {
        if (item.id === id) {
          const updatedQuantity =
            delta === 1 ? item.quantity + 1 : item.quantity - 1;

          return {
            ...item,
            quantity: updatedQuantity,
          };
        }

        return item;
      })
      .filter((item) => item.quantity > 0);

    this.cartItems.set(updatedCart);

    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }

  removeFromCart(id: number) {
    const updatedCart = this.cartItems().filter((p) => p.id !== id);
    this.cartItems.set([...updatedCart]);
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }

  clearCart() {
    this.cartItems.set([])
    localStorage.removeItem('cart');
  }
}

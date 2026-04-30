import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.scss',
})
export class ProductDetailsPageComponent {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private toastService: ToastService,
  ) {}

  product = signal<any>(null);
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const productId = params['id'];

      this.getProduct(productId);
    });
  }

  getProduct(id: number) {
    this.isLoading.set(true);

    this.productService.getProductById(id).subscribe({
      next: (response) => {
        this.product.set(response);
      },

      error: (error) => {
        console.log(error);
      },

      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  onAddToCart() {
    if (!this.authService.currentUser()) {
      this.toastService.error('Please login to continue');
      return;
    }
    this.cartService.addToCart(this.product());
    this.toastService.success('Yay! It’s in your cart.');
    return;
  }
}

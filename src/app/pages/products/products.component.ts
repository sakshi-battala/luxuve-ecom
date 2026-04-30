import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [LoaderComponent, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products = signal<any>([]);
  isLoading = signal<boolean>(false);
  category = signal<string>('');

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.category.set(params['category']);
      this.getProductsByCategory();
    });
  }

  getProductsByCategory() {
    this.isLoading.set(true);

    this.productService.getProductsByCategory(this.category()).subscribe({
      next: (res: any) => {
        this.products.set(res.products);
      },

      error: (err) => {
        console.log(err);
      },

      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}

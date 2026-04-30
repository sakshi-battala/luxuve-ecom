import { Component, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-category-grid',
  standalone: true,
  imports: [CategoryCardComponent, LoaderComponent],
  templateUrl: './category-grid.component.html',
  styleUrl: './category-grid.component.scss',
})
export class CategoryGridComponent implements OnInit {
  categories = signal<any[]>([]);
  isLoading = signal<boolean>(true);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.isLoading.set(true);

    this.productService.getCategories().subscribe({
      next: (res: any) => {
        this.categories.set(res);
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

import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
})
export class CategoryCardComponent {
  category = input<any>();
}

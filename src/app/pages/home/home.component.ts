import { Component } from '@angular/core';
import { HeroComponent } from "../../components/hero/hero.component";
import { CategoryGridComponent } from "../../components/category-grid/category-grid.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, CategoryGridComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

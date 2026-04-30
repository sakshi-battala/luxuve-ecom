import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';

import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

import { CategoryGridComponent } from './components/category-grid/category-grid.component';

import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [
  // auth layout
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [guestGuard],
      },

      {
        path: 'signup',
        component: SignupComponent,
        canActivate: [guestGuard],
      },
    ],
  },

  // main layout
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },

      {
        path: 'collections',
        component: CategoryGridComponent,
      },

      {
        path: 'products/category/:category',
        component: ProductsComponent,
      },

      {
        path: 'products/category/:category/:id',
        component: ProductDetailsPageComponent,
      },

      {
        path: 'cart',
        component: CartComponent,
      },

      {
        path: 'checkout',
        component: CheckoutComponent,
      },
    ],
  },

  {
    path: '**',
    redirectTo: '/home',
  },
];

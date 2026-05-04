# Angular Ecommerce Application

## Live Demo

- https://chipper-custard-a8a391.netlify.app/home

## Project Overview

This Angular Ecommerce Application is a modern storefront built for portfolio and GitHub showcase use. It combines Angular, Firebase Authentication, Angular Signals, and DummyJSON for a responsive product browsing experience with cart persistence, checkout workflow, and authenticated user access.

## Features

- Firebase Email/Password Authentication
- Google Authentication
- Route Guards for protected routes
- Light / Dark theme toggle
- Collections / categories page
- Category-specific product listing
- Product Details Page (PDP)
- Add to cart functionality
- Cart quantity management
- Cart summary and subtotal tracking
- Checkout flow with address and payment selection
- Order success popup
- LocalStorage cart persistence
- Orders page with Firebase Firestore order history
- Order tracking and management

## Tech Stack

- Angular 18
- Firebase Authentication
- Firebase Firestore (for order storage)
- Angular Signals
- DummyJSON API
- SCSS
- Notyf for toast notifications

## Application Flow

1. Home Page
2. Collections Page
3. Category Products
4. Product Details Page
5. Add To Cart
6. Cart
7. Checkout
8. Success Popup
9. Orders Page (view order history)

## User Flow Diagrams

### New User Journey

```
Landing (Home)
  ↓
Signup/Google Auth
  ↓
Browse Collections
  ↓
Select Category
  ↓
View Products
  ↓
Product Details
  ↓
Add to Cart
  ↓
Cart Review
  ↓
Checkout (Address & Payment)
  ↓
Order Success
```

### Returning User Journey

```
Login/Google Auth
  ↓
Home (with persisted cart)
  ↓
Continue Shopping or Proceed to Checkout
  ↓
Review Cart Items
  ↓
Checkout
  ↓
Order Success
  ↓
View Orders Page (order history from Firestore)
```

### Guest User Journey (Browse Only)

```
Home
  ↓
Collections
  ↓
Category Products
  ↓
Product Details
  ↓
Cart (add items)
  ↓
Prompted to Login for Checkout
```

### Authentication Flow

```
Guest User
  ├─ Signup (Email/Password) → Home
  ├─ Google Sign-In → Home
  └─ Login (Email/Password) → Home

Authenticated User
  └─ Access Protected Routes (Cart, Checkout)
  └─ Guest Guard blocks re-login/signup
```

## Folder Structure

```
src/
  app/
    components/
      category-card/
      category-grid/
      hero/
      navbar/
      product-card/
    guards/
      auth.guard.ts
      guest.guard.ts
    layouts/
      auth-layout/
      main-layout/
    pages/
      cart/
      checkout/
      home/
      login/
      orders/
      product-details-page/
      products/
      signup/
    services/
      auth.service.ts
      cart.service.ts
      order.service.ts
      product.service.ts
      toast.service.ts
    shared/
      loader/
    app.routes.ts
    firebase.config.ts
styles/
  _variables.scss
```

## Setup & Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd e-commerce-app-angular
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm start
   ```
4. Open the app in your browser:
   ```
   http://localhost:4200
   ```

## Firebase Setup Instructions

1. Create a Firebase project at https://console.firebase.google.com.
2. Enable Authentication > Sign-in methods:
   - Email/Password
   - Google
3. Register a Web App in Firebase and copy the Firebase configuration.
4. Replace the configuration in `src/app/firebase.config.ts` with your Firebase app values:
   ```ts
   export const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };
   ```
5. Ensure Firebase rules and domain settings allow local development.

## Available Routes

- `/home` — Home page
- `/collections` — Collections / categories gallery
- `/products/category/:category` — Category products list
- `/products/category/:category/:id` — Product details page
- `/cart` — Cart overview and quantity management
- `/checkout` — Checkout flow
- `/orders` — Order history and tracking (authenticated users only)
- `/login` — Login page
- `/signup` — Signup page
- `/**` — Redirects to `/home`

## Future Improvements

- Add payment gateway integration (Stripe, PayPal)
- Add product search and filtering
- Add wishlist / favorites
- Improve mobile responsiveness and accessibility
- Add admin panel for managing products and categories
- Add order status tracking (in progress, shipped, delivered)
- Add order cancellation and return functionality

## Deployment Instructions

1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Deploy the generated `dist/` folder to your hosting provider.

---

## Notes

- The app uses DummyJSON as a product data source.
- Cart data is persisted in LocalStorage, preserving user selections between sessions.
- The architecture focuses on standalone components, layout-based routing, Signal-driven state management, and shared services for core app behavior.

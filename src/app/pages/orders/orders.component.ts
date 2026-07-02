import { Component, inject, OnInit, signal } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';

import { DatePipe } from '@angular/common';

import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe, RouterLink, LoaderComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  orders = signal<any[]>([]);

  isLoading = signal<boolean>(true);

  private authService = inject(AuthService);

  private orderService = inject(OrderService);

  ngOnInit() {
    const interval = setInterval(() => {
      const user = this.authService.currentUser();

      if (!user) return;

      clearInterval(interval);

      this.orderService.getOrdersByUser(user.uid).subscribe({
        next: (res: any) => {
          this.orders.set(res);

          this.isLoading.set(false);
        },

        error: () => {
          this.isLoading.set(false);
        },
      });
    }, 100);
  }
}

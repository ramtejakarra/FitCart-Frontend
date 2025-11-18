import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CartItem } from '../cart/cart.reducer';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {
  cartCount$!: Observable<number>;

  constructor(
    private store: Store<{ cart: CartItem[] }>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartCount$ = this.store.select('cart').pipe(
      map(items => items.reduce((sum, item) => sum + item.quantity, 0))
    );
  }

  navigateToHome(): void {
    this.router.navigate(['/user/home']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}

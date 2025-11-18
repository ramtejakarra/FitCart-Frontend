import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} from './cart.actions';
import { CartItem } from './cart.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems$!: Observable<CartItem[]>;
  total$!: Observable<number>;

  constructor(
    private store: Store<{ cart: CartItem[] }>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems$ = this.store.select('cart');

    this.total$ = this.cartItems$.pipe(
      map(items => items.reduce((sum, item) => sum + item.price * item.quantity, 0))
    );
  }

  increase(id: number) {
    this.store.dispatch(increaseQuantity({ productId: id }));
  }

  decrease(id: number) {
    this.store.dispatch(decreaseQuantity({ productId: id }));
  }

  remove(id: number) {
    this.store.dispatch(removeFromCart({ productId: id }));
  }

  clearCart() {
    this.store.dispatch(clearCart());
  }

  goToCheckout() {
    this.router.navigate(['/user/checkout']);
  }
}

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCartItems, selectCartTotal } from '../cart/cart.selectors';
import { removeFromCart, increaseQty, decreaseQty, clearCart } from '../cart/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems$ = this.store.select(selectCartItems);
  total$ = this.store.select(selectCartTotal);

  constructor(private store: Store) {}

  remove(id: number) {
    this.store.dispatch(removeFromCart({ productId: id }));
  }

  increase(id: number) {
    this.store.dispatch(increaseQty({ productId: id }));
  }

  decrease(id: number) {
    this.store.dispatch(decreaseQty({ productId: id }));
  }

  clearCart() {
    this.store.dispatch(clearCart());
  }
}

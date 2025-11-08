import { createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } from './cart.actions';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export const initialState: CartItem[] = [];

export const cartReducer = createReducer(
  initialState,

  on(addToCart, (state, { product }) => {
    const existing = state.find(item => item.id === product.id);
    if (existing) {
      return state.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      return [...state, { ...product, quantity: 1 }];
    }
  }),

  on(removeFromCart, (state, { productId }) => state.filter(item => item.id !== productId)),

  on(increaseQty, (state, { productId }) =>
    state.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)
  ),

  on(decreaseQty, (state, { productId }) =>
    state.map(item =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  ),

  on(clearCart, () => [])
);

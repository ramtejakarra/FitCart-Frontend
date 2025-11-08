import { createAction, props } from '@ngrx/store';

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: any }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ productId: number }>()
);

export const increaseQty = createAction(
  '[Cart] Increase Quantity',
  props<{ productId: number }>()
);

export const decreaseQty = createAction(
  '[Cart] Decrease Quantity',
  props<{ productId: number }>()
);

export const clearCart = createAction('[Cart] Clear Cart');

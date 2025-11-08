import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart: any[] = [];

  getCart() {
    return this.cart;
  }

  addToCart(product: any) {
    const existing = this.cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    console.log('🛒 Current Cart:', this.cart);
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter((item) => item.id !== productId);
  }

  clearCart() {
    this.cart = [];
  }
}

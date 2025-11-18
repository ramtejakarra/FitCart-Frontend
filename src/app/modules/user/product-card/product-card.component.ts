import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { addToCart } from '../cart/cart.actions';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(
    private store: Store,
    private snackBar: MatSnackBar // ✅ Make sure this is here
  ) {}

  addToCart(product: Product): void {
    this.store.dispatch(addToCart({ product }));

    this.snackBar.open(`🛒 ${product.name} added to cart!`, 'Close', {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['fitcart-snackbar']
    });
  }
}

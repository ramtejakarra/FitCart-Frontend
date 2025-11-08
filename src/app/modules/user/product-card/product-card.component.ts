import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: any; // 👈 Receives product data from parent (ProductListComponent)

  addToCart(): void {
    // 🧠 For now, just log or show alert — later you can integrate real cart service
    console.log('Added to cart:', this.product);
    alert(`${this.product.name} added to cart 🛒`);
  }
}

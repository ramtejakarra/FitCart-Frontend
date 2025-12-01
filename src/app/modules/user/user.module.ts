import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// NgRx
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './cart/cart.reducer';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';  // ⭐ ADD THIS

// Components
import { UserRoutingModule } from './user-routing.module';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './payment/checkout.component';
import { PaymentSuccessComponent } from '../../payment-success/payment-success.component';

@NgModule({
  declarations: [
    UserLayoutComponent,
    HomeComponent,
    CategoryComponent,
    ProductListComponent,
    ProductCardComponent,
    CartComponent,
    CheckoutComponent,
    PaymentSuccessComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    UserRoutingModule,
    StoreModule.forFeature('cart', cartReducer),

    // Material Modules
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule  // ⭐ REQUIRED FOR <mat-spinner>
  ]
})
export class UserModule {}

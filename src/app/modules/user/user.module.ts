import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './cart/cart.reducer';

import { SharedModule } from 'src/app/shared/shared.module';


import { UserRoutingModule } from './user-routing.module';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CartComponent } from './cart/cart.component';  // ✅ ADD THIS

@NgModule({
  declarations: [
    UserLayoutComponent,
    HomeComponent,
    CategoryComponent,
    ProductListComponent,
    ProductCardComponent,
    CartComponent  // ✅ ADD HERE
  ],
  imports: [
    CommonModule,   
    StoreModule.forFeature('cart', cartReducer),   
    RouterModule,
    FormsModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    UserRoutingModule,
     SharedModule, 
  ]
})
export class UserModule {}

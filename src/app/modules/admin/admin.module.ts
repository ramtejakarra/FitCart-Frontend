import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { AddProductDialogComponent } from './product-dialog/add-product-dialog.component';
import { CategoryProductsComponent } from './category-products/category-products.component';

// ✅ Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; // ✅ Needed for mat-select
import { MatOptionModule } from '@angular/material/core';   // ✅ Needed for mat-option

@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    OrdersComponent,
    AdminLayoutComponent,
    ConfirmDialogComponent,
    AddProductDialogComponent,
      CategoryProductsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,

    // ✅ Angular Material modules
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule, // ✅ Added
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule, // ✅ Added
    MatOptionModule  // ✅ Added
  ]
})
export class AdminModule {}

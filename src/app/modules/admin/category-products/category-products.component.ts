import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { AddProductDialogComponent } from '../product-dialog/add-product-dialog.component';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss']
})
export class CategoryProductsComponent implements OnInit {
  categories: any[] = [];
  subCategories: any[] = [];
  products: any[] = [];
  selectedCategoryId: number | null = null;
  selectedSubCategoryId: number | null = null;
  loading = false;

  constructor(
    private categorySvc: CategoryService,
    private productSvc: ProductService,
    private snack: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  /** 🟢 Load all categories */
  loadCategories(): void {
    this.loading = true;
    this.categorySvc.getAll().subscribe({

      next: (data: any[]) => {
        this.categories = data;
        this.loading = false;
        console.log('✅ Categories loaded:', data);
      },
      error: (err) => {
        this.loading = false;
        console.error('❌ Failed to load categories:', err);
        this.snack.open('Failed to load categories ❌', 'Close', { duration: 2000 });
      }
    });
  }

  /** 🟣 When category selected — load subcategories */
  onCategorySelect(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.subCategories = [];
    this.products = [];
    this.selectedSubCategoryId = null;

    this.categorySvc.getSubCategories(categoryId).subscribe({
      next: (data: any[]) => {
        this.subCategories = data;
        console.log(`✅ Subcategories for Category ${categoryId}:`, data);
      },
      error: (err) => {
        console.error('❌ Failed to load subcategories:', err);
        this.snack.open('Failed to load subcategories ❌', 'Close', { duration: 2000 });
      }
    });
  }

  /** 🟡 When subcategory selected — load products */
  onSubCategorySelect(subId: number): void {
    this.selectedSubCategoryId = subId;
    this.loading = true;

    this.productSvc.getBySubCategory(subId).subscribe({
      next: (data: any[]) => {
        this.products = data;
        this.loading = false;
        console.log(`✅ Products for Subcategory ${subId}:`, data);
      },
      error: (err) => {
        this.loading = false;
        console.error('❌ Failed to load products:', err);
        this.snack.open('Failed to load products ❌', 'Close', { duration: 2000 });
      }
    });
  }

  /** 🟢 Open Add Product dialog */
  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '600px',
      data: {
        categoryId: this.selectedCategoryId,
        subCategoryId: this.selectedSubCategoryId
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true || result === 'saved') {
        this.snack.open('Product added successfully ✅', 'Close', { duration: 2000 });
        if (this.selectedSubCategoryId) {
          this.onSubCategorySelect(this.selectedSubCategoryId);
        }
      }
    });
  }

  /** 🔴 Delete a product */
  deleteProduct(id: number): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Product',
        message: 'Are you sure you want to delete this product?'
      }
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;

      this.productSvc.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter((p) => p.id !== id);
          this.snack.open('Product deleted ✅', 'Close', { duration: 2000 });
        },
        error: (err) => {
          console.error('❌ Failed to delete product:', err);
          this.snack.open('Failed to delete product ❌', 'Close', { duration: 2000 });
        }
      });
    });
  }
}

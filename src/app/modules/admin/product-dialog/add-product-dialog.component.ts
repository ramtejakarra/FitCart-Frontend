import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit {
  categories: any[] = [];
  subCategories: any[] = [];
  product: any = {
    name: '',
    description: '',
    categoryId: null,
    subCategoryId: null,
    price: 0,
    stock: 0,
    discount: 0,
    imageUrl: ''
  };

  constructor(
    private dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categorySvc: CategoryService,
    private productSvc: ProductService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCategories();

    // If category/subcategory is passed from parent
    if (this.data?.categoryId) this.product.categoryId = this.data.categoryId;
    if (this.data?.subCategoryId) this.product.subCategoryId = this.data.subCategoryId;

    if (this.product.categoryId) {
      this.onCategoryChange(this.product.categoryId);
    }
  }

  loadCategories() {
    this.categorySvc.getAll().subscribe({

      next: (data) => (this.categories = data),
      error: () => this.snack.open('Failed to load categories ❌', 'Close', { duration: 2000 })
    });
  }

  onCategoryChange(categoryId: number) {
    this.categorySvc.getSubCategories(categoryId).subscribe({
      next: (data) => (this.subCategories = data),
      error: () => this.snack.open('Failed to load subcategories ❌', 'Close', { duration: 2000 })
    });
  }

  saveProduct() {
    if (!this.product.categoryId || !this.product.subCategoryId) {
      this.snack.open('Please select both category and subcategory ❗', 'Close', { duration: 2000 });
      return;
    }

    this.productSvc.addProduct(this.product).subscribe({
      next: () => {
        this.snack.open('Product added successfully ✅', 'Close', { duration: 2000 });
        this.dialogRef.close('saved');
      },
      error: () => {
        this.snack.open('Failed to add product ❌', 'Close', { duration: 2000 });
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

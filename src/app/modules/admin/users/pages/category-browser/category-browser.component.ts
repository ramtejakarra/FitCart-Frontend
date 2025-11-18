import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../../services/category.service';
import { ProductService } from '../../../../../services/product.service';

@Component({
  selector: 'app-category-browser',
  templateUrl: './category-browser.component.html',
  styleUrls: ['./category-browser.component.scss']
})
export class CategoryBrowserComponent implements OnInit {
  categories: any[] = [];
  subCategories: any[] = [];
  products: any[] = [];

  selectedCategory: any = null;
  selectedSubCategory: any = null;

  loading = false;
  errorMessage = '';

  constructor(
    private categorySvc: CategoryService,
    private productSvc: ProductService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  /** 🔹 Load all main categories */
  loadCategories(): void {
    this.loading = true;
    this.errorMessage = '';

    this.categorySvc.getAll().subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Failed to load categories. Please try again.';
        console.error('Error loading categories:', err);
      }
    });
  }

  /** 🔹 When a main category is selected */
  selectCategory(category: any): void {
    this.selectedCategory = category;
    this.selectedSubCategory = null;
    this.subCategories = [];
    this.products = [];
    this.errorMessage = '';

    this.loading = true;

    this.categorySvc.getSubCategories(category.id).subscribe({
      next: (data) => {
        this.subCategories = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Error fetching subcategories.';
        console.error('Error fetching subcategories:', err);
      }
    });
  }

  /** 🔹 When a subcategory is selected */
  selectSubCategory(sub: any): void {
    this.selectedSubCategory = sub;
    this.products = [];
    this.loading = true;
    this.errorMessage = '';

    // Small delay for smoother UX (shows loading spinner briefly)
    setTimeout(() => {
      this.productSvc.getBySubCategory(sub.id).subscribe({
        next: (data) => {
          this.products = data;
          this.loading = false;

          if (!this.products.length) {
            this.errorMessage = 'No products available in this subcategory.';
          }
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = 'Error loading products.';
          console.error('Error loading products:', err);
        }
      });
    }, 400);
  }
}
